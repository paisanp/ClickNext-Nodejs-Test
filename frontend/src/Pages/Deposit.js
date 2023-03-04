import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, FloatingLabel, Form, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../Components/NavBar';

function Deposit() {
    const navigate = useNavigate();

    var token = localStorage.getItem('token');
    var username = localStorage.getItem('username')

    const [error, setError] = useState(null);
    const [depositamount, setDepositamount] = useState(null);
    const [state, setState] = useState(null);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const loadData = async () => {
            await axios.post("http://localhost:5001/deposit", { token, username }).then((res) => {
                setUser(res.data.user)
            }).catch(error => {
                setError(error)
            })
        };

        loadData();

    }, []);

    if (error) return navigate("/login");

    const deposit = async () => {
        await axios.post("http://localhost:5001/deposit", { token, username, depositamount }).then((res) => {
            setState(res.data.state)
            setMessage(res.data.message)
            setShow(false)
        });
    }
    if (state) {
        navigate("/");
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
                        <h2>Deposit</h2>
                        <p style={{ fontSize: 20 }}>Current Balance: {user.current_balance}</p>
                        <FloatingLabel controlId="floatingInput" label="Amount to deposit" className="mb-3" >
                            <Form.Control type="number" placeholder="Amount to deposit" onChange={(e) => { setDepositamount(e.target.value) }} />
                        </FloatingLabel>
                        <div style={{ color: "#FF0000" }}>{message}</div>
                        <Button variant="danger" onClick={handleShow}> Deposit </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deposit amount: {depositamount}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deposit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Deposit