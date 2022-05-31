import React, { useState, useEffect } from 'react'
import { Container, Form, FloatingLabel, Button } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"
function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(false)
    useEffect(() => {
        // kontrola zdali jiz uzivatel neni prihlasen 
        setUser(sessionStorage.getItem("user") === null ? false : JSON.parse(sessionStorage.getItem("user")))
    }, [])

    const tryLogin = () => {
        axios.post('http://localhost:3002/login', {
            username: username,
            password: password
        }).then(response => {
            // kontrole udaju zdali jsou v databazi
            if (response.data.status === false) {
                alert("Špatné uživatelské jméno nebo heslo")
                return
            }
            // uzivatel prihlasen
            sessionStorage.setItem("user", JSON.stringify(response.data[0]))
            window.location.replace('/');
        })
    }


    return (
        <Container className='fadeIn box-shadow flex form-login container-wrap post-container p-4'>
            {user ? <div>
                <p className='text-center pt-2'>
                    Učet je již přihlášen <span style={{ color: "#f7ad44", fontWeight: "bold" }}>{user.user_name}</span>, pro návrat klikněte <Link to={"/home"}>zde</Link>
                </p>

            </div>
                :
                <Form>
                    <h4 className='text-center mb-5'>Přihlášení</h4>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Jméno"
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
                        Pro přihlášení použijte jméno: admin, heslo: admin nebo jméno: admin2, heslo: admin2
                    </Form.Text>
                    <div className="div-center mt-2">
                        <Button type="button" className='post-button' onClick={() => tryLogin()}>
                            Přihlásit
                        </Button>
                    </div>
                </Form>
            }
        </Container>
    )
}

export default Login