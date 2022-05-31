import React, { useState, useEffect } from 'react'
import { Form, Button, FloatingLabel, Container } from "react-bootstrap"
import axios from "axios"
import { Link } from 'react-router-dom';

function CreatePost() {

    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [user, setUser] = useState(false)

    useEffect(() => {
        setUser(sessionStorage.getItem("user") === null ? false : JSON.parse(sessionStorage.getItem("user")))
    }, [])

    const sendPost = () => {
        if (title.length < 5 || message.length < 10) {
            alert("Minimální velikost titulku musí být 5 a textu 10 znaků")
            return
        }
        axios.post("http://localhost:3002/createpost", {
            title: title,
            message: message,
            user_id: user.user_id
        }).then(response => {
            alert("Příspěvek byl úspešně vytvořen")
            setTitle("")
            setMessage("")
        })
    }

    return (
        <Container className='mt-5 fadeIn bg-light box-shadow flex container-wrap post-container p-4'>
            {user === false ?
                <div>
                    Pro přidání příspvěku se musíte přihlásit <Link to='/login'>zde</Link>
                </div>
                :
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Titulek"
                            className="mb-3 form-input"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        >
                            <Form.Control type="text" placeholder="Titulek" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea2" label="Text">
                            <Form.Control
                                as="textarea"
                                placeholder="Text"
                                className="form-input"
                                style={{ height: '120px' }}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <div className="div-center">
                        <Button type="button" className='post-button' onClick={() => sendPost()}>
                            Vytvořit
                        </Button>
                    </div>
                </Form>
            }
        </Container>

    )
}

export default CreatePost