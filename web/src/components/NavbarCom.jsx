import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Form, Offcanvas, Container, NavDropdown, Button, FormControl } from "react-bootstrap"
import { Link } from 'react-router-dom';
const NavbarCom = () => {

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        setIsLogged(sessionStorage.getItem("user") === null ? false : JSON.parse(sessionStorage.getItem("user")))
    }, [])

    const logOut = () => {
        sessionStorage.removeItem("user")
        window.location.reload();
    }

    return (
        <Navbar bg="light" expand="lg" className="slideFromTop box-shadow">
            <Container>
                <Navbar.Brand >
                    <span className="nav-brand-part">Good</span>sailors
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >
                        <Link to="/" className='nav-link'>Domů</Link>
                        {isLogged ?
                            <Link to="/create" className='nav-link'>Přidat příspěvek</Link> : " "}
                    </Nav>
                    <Nav>
                        {isLogged !== false ?
                            <>
                                {/* <span className='nav-link text-uppercase'>{isLogged.user_name}</span> */}
                                <span className='nav-link' onClick={() => logOut()}>Odhlásit se</span>
                            </>
                            :
                            <Link to="/login" className='nav-link'>Přihlásit se</Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarCom;
