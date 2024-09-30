import { createContext,useCallback,useEffect,useState } from "react";
import { postResquest,baseUrl } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name : "",
        gender : "",
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });


    useEffect(() => {
        document.title = 'Blabbie';

        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
        favicon.href = "/favicon.png"; 
        }
      }, []);


    useEffect(()=>{
        const user = localStorage.getItem('User');

        setUser(JSON.parse(user));
    },[]);

    const updateRegisterInfo = useCallback((info) => {setRegisterInfo(info);},[]);

    const registerUser = useCallback(async(e) => {
        e.preventDefault()

        setIsRegisterLoading(true)
        setRegisterError(null)
        const response = await postResquest(`${baseUrl}/users/registration`,JSON.stringify(registerInfo)) 
    
        setIsRegisterLoading(false)
        if(response.error){
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response))

        setUser(response);
    },[registerInfo]);

    


    const updateLoginInfo = useCallback((info) => {setLoginInfo(info);},[]);

    const loginUser = useCallback(async(e) => {
        e.preventDefault()

        setIsLoginLoading(true)
        setLoginError(null)
        const response = await postResquest(`${baseUrl}/users/login`,JSON.stringify(loginInfo)) 
    
        setIsLoginLoading(false)
        if(response.error){
            return setLoginError(response);
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);
    },[loginInfo])


    
    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    },[]);

    return (
    <AuthContext.Provider value={{
        user, logoutUser, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading,
        loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading
        }}>
        {children}
    </AuthContext.Provider>
    );
}
