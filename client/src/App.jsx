import {Routes, Route, Navigate} from "react-router-dom"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NavBar from "./pages/Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { ChatContextProvider } from "./context/ChatContext"

function App() {
  const {user} = useContext(AuthContext);
  return (
    <ChatContextProvider user = {user}>
    <NavBar />
    <Container>
      <Routes>
        <Route path="/" element={user ? <Chat /> : <Login />}></Route>
        <Route path="/Login" element={user ? <Chat /> : <Login />}></Route>
        <Route path="/Register" element={user ? <Chat /> : <Register />}></Route>
        <Route path="*" element={<Navigate />} to="/" />
      </Routes>
    </Container>
    </ChatContextProvider>
  
  );
}

export default App
