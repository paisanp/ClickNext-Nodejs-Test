import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../Components/NavBar';
import {Container, Row, Col} from 'react-bootstrap';

function Home() {
  const navigate = useNavigate();

  var token = localStorage.getItem('token');
  var username = localStorage.getItem('username')

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await axios.post("http://localhost:5001/", { token, username }).then((res) => {
        setUser(res.data.user)
      }).catch(error => {
        setError(error)
      })
    };

    loadData();

  }, []);

  if (error) return navigate("/login");

  if (!user) {
    return <div>Loading</div>
  }

  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <h1>My Account: {user.firstname} {user.lastname} </h1>
            <p style={{ fontSize: 20 }}>Your Phone Number: {user.phonenumber}</p>
            <p style={{ fontSize: 25 }}>Current Balance: {user.current_balance}</p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default Home
