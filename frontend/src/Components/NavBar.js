import {Container, Nav, Navbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.setItem('token', null);
    navigate("/login");
  };
  return (
    <>
        <Navbar key={'xxl'} bg="danger" variant="dark" expand='sm' className="mb-3" disabled>
          <Container fluid>
            
            <Navbar.Brand href="/">Bank Account</Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-xxl`}
              aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xxl`}>
                Bank Account
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-5">
                  <Nav.Link href="/deposit">Deposit</Nav.Link>
                  <Nav.Link href="/withdraw">Withdraw</Nav.Link>
                  <Nav.Link href="/transfer">Transfer</Nav.Link>
                  <NavDropdown title="History" id={`offcanvasNavbarDropdown-expand-xxl`}
                  >
                    <NavDropdown.Item href="/transferhistory">TransferHistory</NavDropdown.Item>
                    <NavDropdown.Item href="/receivehistory"> ReceiveHistory </NavDropdown.Item>

                  </NavDropdown>
                  <Nav.Link onClick={Logout}>Logout</Nav.Link>
                </Nav>
              </Offcanvas.Body>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}
export default NavBar