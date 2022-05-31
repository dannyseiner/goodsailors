import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Container, Form, Button, FloatingLabel } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
function EditPost() {
    const params = useParams()

    const [post, setPost] = useState({})
    const [user, setUser] = useState({ notlogged: true })

    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        getPost()
        setUser(sessionStorage.getItem("user") === null ? { notlogged: true } : JSON.parse(sessionStorage.getItem("user")))
    }, [])

    useEffect(() => {
        if (user.user_id && post.post_author_id) {
            if (user.user_id !== post.post_author_id) {
                window.location.replace('/home')
            }
        }
    }, [user])

    const getPost = () => {
        axios.get(`http://localhost:3002/post/${params.id}`)
            .then(response => {
                console.log(response.data)
                setPost(response.data[0])
                setTitle(response.data[0].post_title)
                setMessage(response.data[0].post_message)
                setUser(sessionStorage.getItem("user") === null ? { notlogged: true } : JSON.parse(sessionStorage.getItem("user")))
                console.log(title, message)
            })
    }

    const updatePost = () => {
        axios.post('http://localhost:3002/editpost', {
            title: title,
            message: message,
            post_id: post.post_id,
            post_author_id: user.user_id
        }).then(response => {
            if (response.data.status === "OK") {
                alert("Prispevek byl upraven")
            }
        })
    }

    const deletePost = () => {
        if (window.confirm("Opravdu chcete odstranit tento prispevek?") == true) {
            axios.post('http://localhost:3002/deletepost', {
                post_id: post.post_id,
                post_author_id: user.user_id
            }).then(response => {
                if (response.data.status === "OK") {
                    alert("Prispevek byl smazan")
                    document.location.replace('/home')
                }
            })
        }

    }
    return (
        <Container className='mt-5 fadeIn bg-light box-shadow flex container-wrap post-container p-4'>
            {user.notlogged === true ?
                <div>
                    Pro upraveni prispevku se musite prihlasit <Link to='/login'>zde</Link>
                </div>
                :
                <Form>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Titulek"
                            className="mb-3 form-input"


                        >
                            <Form.Control type="email" placeholder="name@example.com" onChange={e => setTitle(e.target.value)} value={title} />
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
                        <Button type="button" className='post-button' onClick={() => deletePost()}>
                            Smazat
                        </Button>
                        <Button type="button" className='post-button mx-3' onClick={() => updatePost()}>
                            Upravit
                        </Button>
                    </div>
                </Form>
            }
        </Container >
    )
}

export default EditPost