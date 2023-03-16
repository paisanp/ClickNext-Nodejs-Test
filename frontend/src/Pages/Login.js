import React, { useState } from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

function Login() {

  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const login = async () => {
    await axios.post("http://localhost:5001/login", { username, password }).then((res) => {
      setMessage(res.data.message)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.data.username)

    });

    window.location.href = "/";
  };


  return (
    <><Navbar key={'xxl'} bg="danger" variant="dark" expand='sm' className="mb-3">
    <Container fluid>
      <Navbar.Brand href="/">Bank Account</Navbar.Brand>
    </Container>
  </Navbar>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={5}>
            <br />
            <br />
            <h1>Login</h1>
            <br />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter email" value={username} onChange={(e) => { setUsername(e.target.value) }} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </Form.Group>
              <div style={{ color: "#FF0000" }}>{message}</div>
              <Button variant="danger" onClick={login}> Login </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  )
}

export default Login