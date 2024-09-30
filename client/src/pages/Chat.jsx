import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
    const {user} = useContext(AuthContext)
    const {userChats, updateCurrentChat} = useContext(ChatContext)

    return <Container className="chatbox-full">
        <PotentialChats />
        {userChats?.length < 1 ? null : (
            <Stack direction="horizontal" gap={4} className="align-atems-start">
                <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                    {userChats?.map((chat,index)=>{
                        return(
                            <div key={index} onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user}></UserChat>
                            </div>
                        )
                    })}
                </Stack>
                <Stack className="chat-room">
                    <ChatBox/>
                </Stack>
            </Stack>
        )}
    </Container>;
}
 
export default Chat;