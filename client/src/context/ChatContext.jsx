import { createContext,useCallback,useEffect,useState } from "react";
import { getRequest, postResquest,baseUrl } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({children,user}) => {
    const [userChats, setUserChats] = useState(null);
    const [userChatError, setUserChatError] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setMessagesloading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    console.log("online users", onlineUsers)

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        }
    },[user]);

    useEffect(()=>{
        if(socket === null) return
        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })
    },[socket]);

    useEffect(()=>{
        if(socket === null) return;
        const recipientId = currentChat?.members.find((id) => id !==user?._id);
        socket.emit("sendMessage", {...newMessage, recipientId});
    },[newMessage]);

    useEffect(()=>{
        if(socket === null) return;
        socket.on("getMessage",res => {
            if(currentChat?._id !== res.chatId) return;

            setMessages((prev) => [...prev, res]);
        })

        return () => {
            socket.off("getMessage")
        }
    },[socket,currentChat]);


    useEffect(() => {
        const getUsers = async() => {
            const response = await getRequest(`${baseUrl}/users`);

            if(response.error){
                return console.log(response)
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false;
                if(user?._id === u._id){ return false };

                if(userChats){
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }
                return !isChatCreated
            })

            setPotentialChats(pChats)
        };
        getUsers();
    },[userChats]);

    useEffect(()=>{
        const getUserChats = async()=>{
            if(user?._id){
                setIsUserChatsLoading(true)
                setUserChatError(null)
                const response = await getRequest(`${baseUrl}/chat/${user?._id}`)
                if(response.error){
                    return setUserChatError(response)
                }

            setUserChats(response);
            }
        }

        getUserChats()
    },[user]);

    useEffect(()=>{
        const getMessages = async()=>{
            setMessagesloading(true);
            setMessagesError(null)
            const response = await getRequest(`${baseUrl}/message/${currentChat?._id}`)
            
            setMessagesloading(false)
            if(response.error){
                return setMessagesError(response)
            }

            setMessages(response);
            
        }

        getMessages()
    },[currentChat]);

    const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMessage) => {
        if(!textMessage) return console.log("You must type something ...")

        const response = await postResquest(`${baseUrl}/message`,JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }));
        if(response.error){
            return setSendTextMessageError(response)
        }
        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage("")

    },[])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    },[]);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postResquest(`${baseUrl}/chat`,JSON.stringify({
            firstId,secondId
        }));
        if(response.error){
            return console.log(response);
        }
        setUserChats((prev) =>  [...prev,response]);
    },[]);

    return (
    <ChatContext.Provider value={{
        userChats, userChatError, isUserChatsLoading, potentialChats, createChat, updateCurrentChat, messages, isMessagesLoading, messagesError, currentChat,
         sendTextMessage, onlineUsers,
        }}>
        {children}
    </ChatContext.Provider>
    );
}
