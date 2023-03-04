import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Table, Container, Row, Col} from 'react-bootstrap';
import Navbar from '../Components/NavBar';

function Transferhistory() {
    const navigate = useNavigate();

    var token = localStorage.getItem('token');
    var username = localStorage.getItem('username')

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [alltransferhistory, setAlltransferhistory] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            await axios.post("http://localhost:5001/transferhistory", { token, username }).then((res) => {
                setAlltransferhistory(res.data.alltransferhistory)
                setUser(res.data.user)
            }).catch(error => {
                setError(error)
            })
        };

        loadData();

    }, []);

    if (error) return navigate("/login");

    if (!alltransferhistory) {
        return <div>Loading</div>
    }
    return (<>
        <Navbar />
        <Container>
            <Row>
                <Col></Col>
                <Col xs={10}>
                    <h2>Transfer history of {user.firstname} {user.lastname} </h2>
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Datetime</th>
                                <th>Action</th>
                                <th>Amount</th>
                                <th>To</th>
                                <th>Remain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alltransferhistory.map((transferhistory, i) => {
                                return <tr key={i}>
                                    <td>{transferhistory.date}</td>
                                    <td>{transferhistory.type}</td>
                                    <td>{transferhistory.amount}</td>
                                    <td>{transferhistory.receiver}</td>
                                    <td>{transferhistory.remain}</td>
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

export default Transferhistory