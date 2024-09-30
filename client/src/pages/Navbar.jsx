import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {

    const {user, logoutUser} = useContext(AuthContext);
    return (

    <Navbar className="mb-4 navbar">
        <Container>
            <h2>
                <Link to='/' className="text-decoration-none header" >Blabbie</Link>
            </h2>
            {user && (<><span className="text-success">Logged in as {user?.name}</span></>)}
            <Nav>
                <Stack direction="horizontal" gap="3">
                    {user && (<>
                        <Link onClick={logoutUser} to='/login' className="text-decoration-none header" >Log out</Link>
                    </>)}
                    {!user && (<>
                        <Link to='/login' className="text-decoration-none header" >Login</Link>
                        <Link to='/register' className="text-decoration-none header" >Register</Link>
                    </>)}
                </Stack>
            </Nav>
        </Container>
    </Navbar>

    );
}
 
export default NavBar;