import React, { useState, useEffect } from 'react'
import axios from "axios";
import {Table, Container, Row, Col} from 'react-bootstrap';
import Navbar from '../Components/NavBar';

function Receivehistory() {

    var token = localStorage.getItem('token');
    var username = localStorage.getItem('username')

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [allreceivehistory, setAllreceivehistory] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            await axios.post("http://localhost:5001/receivehistory", { token, username }).then((res) => {
                setAllreceivehistory(res.data.allreceivehistory)
                setUser(res.data.user)
            }).catch(error => {
                setError(error)
            })
        };

        loadData();

    }, []);

    if (error) return window.location.href = "/login";

    if (!allreceivehistory) {
        return <div>Loading</div>
    }
    return (<>
        <Navbar />
        <Container>
            <Row>
                <Col></Col>
                <Col xs={10}>
                    <h2>Receive history of {user.firstname} {user.lastname} </h2>
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Datetime</th>
                                <th>Action</th>
                                <th>Amount</th>
                                <th>From</th>
                                <th>Remain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allreceivehistory.map((receivehistory, i) => {
                                return <tr key={i}>
                                    <td>{receivehistory.date}</td>
                                    <td>{receivehistory.type}</td>
                                    <td>{receivehistory.amount}</td>
                                    <td>{receivehistory.sender}</td>
                                    <td>{receivehistory.remain}</td>
                                </tr>
                            })}

                        </tbody>
                    </Table>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    </>
    )
}

export default Receivehistory