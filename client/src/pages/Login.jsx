import { Alert, Button, Form, Col, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Login = () => {
    const {loginInfo , updateLoginInfo, loginUser, loginError, isLoginLoading} = useContext(AuthContext);
    return <>
    <Form onSubmit={loginUser}>
        <Row style={{textAlign:'center',paddingTop:'5%',justifyContent:'center'}}>
            <Col xs='5'>
                <Stack gap={3}>
                    <h4>Login</h4>
                    <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo(
                        { ...loginInfo, email : e.target.value })}/>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo(
                        { ...loginInfo, password : e.target.value })}/>

                    <Button type="submit" variant="primary">{isLoginLoading ? "Processing ..." : "Login"}</Button>
                    {
                        loginError?.error && <Alert variant="danger">{loginError?.message}</Alert>
                    }
                </Stack>
            </Col>
        </Row>
    </Form>
    </>;
}
 
export default Login;