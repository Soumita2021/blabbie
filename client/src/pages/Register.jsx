import { Alert, Button, Form, Col, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Register = () => {
    const {registerInfo , updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext);
    return <>
    <Form onSubmit={registerUser}>
        <Row style={{textAlign:'center',paddingTop:'5%',justifyContent:'center'}}>
            <Col xs='5'>
                <Stack gap={3}>
                    <h4>Register</h4>
                    <Form.Control type="text" placeholder="Name" onChange={(e) => updateRegisterInfo(
                        { ...registerInfo, name : e.target.value })}/>
                    <Form.Select 
                        aria-label="Gender" 
                        onChange={(e) => updateRegisterInfo({ 
                            ...registerInfo, 
                            gender: e.target.value 
                        })}
                        >
                        <option value="">Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </Form.Select>
                    <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo(
                        { ...registerInfo, email : e.target.value })}/>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => updateRegisterInfo(
                        { ...registerInfo, password : e.target.value })}/>

                    <Button type="submit" variant="primary">{isRegisterLoading ? "Creating an account" : "Register"}</Button>
                    {
                        registerError?.error && <Alert variant="danger">{registerError?.message}</Alert>
                    }
                    
                </Stack>
            </Col>
        </Row>
    </Form>
    </>;
}
 
export default Register;