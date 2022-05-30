import React, { useState } from 'react';
import { Nav, Navbar, Form, Offcanvas, Container, NavDropdown, Button, FormControl } from "react-bootstrap"
import { Link } from 'react-router-dom';
import ModalCom from "./ModalCom"
const NavbarCom = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <Navbar bg="light" expand="lg" className="slideFromTop box-shadow">
            <Container>
                <Navbar.Brand href="#home">Goodsailors</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >
                        <Link to="/home" className='nav-link'>Domu</Link>
                        <Nav.Link onClick={() => setShowModal(true)}>Pridat prispevek</Nav.Link>
                        {/* <NavDropdown title="Dropdown" className="justify-content-end" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <ModalCom
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </Navbar>
    );
}

export default NavbarCom;
