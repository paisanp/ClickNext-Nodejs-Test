import React, { useState, useEffect } from 'react'
import axios from "axios";
import {Button, Modal, FloatingLabel, Form, Container, Row, Col} from 'react-bootstrap';
import Navbar from '../Components/NavBar';

function Withdraw() {

    var token = localStorage.getItem('token');
    var username = localStorage.getItem('username')

    const [error, setError] = useState(null);
    const [withdrawamount, setWithdrawamount] = useState(null);
    const [state, setState] = useState(null);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const loadData = async () => {
            await axios.post("http://localhost:5001/withdraw", { token, username }).then((res) => {
                setUser(res.data.user)
            }).catch(error => {
                setError(error)
            })
        };

        loadData();

    }, []);

    if (error) return window.location.href = "/login";

    const withdraw = async () => {
        await axios.post("http://localhost:5001/withdraw", { token, username, withdrawamount }).then((res) => {
            setState(res.data.state)    
            setMessage(res.data.message)
            setShow(false)
        });
    };
    
    if(state){
        window.location.href = "/";
    }
    if (!user) {
        return <div>Loading</div>
    }

    return (
        <>
            <Navbar />
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={5}>
                        <h2>Withdraw</h2>
                        <p style={{ fontSize: 20 }}>Current Balance: {user.current_balance}</p>
                        <FloatingLabel controlId="floatingInput" label="Amount to withdraw" className="mb-3" >
                            <Form.Control type="number" placeholder="Amount to withdraw" onChange={(e) => { setWithdrawamount(e.target.value) }} />
                        </FloatingLabel>
                        <div style={{ color: "#FF0000" }}>{message}</div>
                        <Button variant="danger" onClick={handleShow}> Withdraw </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Withdraw Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Withdraw amount: {withdrawamount}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={withdraw}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Withdraw