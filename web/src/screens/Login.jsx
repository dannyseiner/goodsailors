import React, { useState, useEffect } from 'react'
import { Container, Form, FloatingLabel, Button } from "react-bootstrap"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(false)
    useEffect(() => {
        setUser(sessionStorage.getItem("user") === null ? false : JSON.parse(sessionStorage.getItem("user")))
    }, [])

    const tryLogin = () => {
        axios.post('http://localhost:3002/login', {
            username: username,
            password: password
        }).then(response => {
            sessionStorage.setItem("user", JSON.stringify(response.data[0]))
            window.location.replace('/home');
        })
    }


    return (
        <Container className='mt-5 fadeIn bg-light box-shadow flex container-wrap post-container p-4'>
            {user ? <div>
                <p className='text-center pt-2'>
                    Ucet je jiz prihlasen <span style={{ color: "#f7ad44", fontWeight: "bold" }}>{user.user_name}</span>, pro navrat kliknite <Link to={"/home"}>zde</Link>
                </p>

            </div>
                :
                <Form>
                    <h4 className='text-center'>Prihlaseni</h4>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Jmeno"
                            className="mb-3 form-input"
                            onChange={e => setUsername(e.target.value)}
                        >
                            <Form.Control type="text" placeholder="admin" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea2" label="Heslo">
                            <Form.Control type="password" placeholder="*******"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Pro prihlaseni pouzijte jmeno: admin, heslo: admin
                    </Form.Text>
                    <div className="div-center mt-2">
                        <Button type="button" className='post-button' onClick={() => tryLogin()}>
                            Prihlasit
                        </Button>
                    </div>
                </Form>
            }
        </Container>
    )
}

export default Login