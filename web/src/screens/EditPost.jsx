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
                window.location.replace('/')
            }
        }
    }, [user])

    const getPost = () => {
        axios.get(`http://localhost:3002/post/${params.id}`)
            .then(response => {
                if (response.data.length === 0) {
                    document.location.replace("/notfound")
                    return
                }
                setPost(response.data[0])
                setTitle(response.data[0].post_title)
                setMessage(response.data[0].post_message)
                setUser(sessionStorage.getItem("user") === null ? { notlogged: true } : JSON.parse(sessionStorage.getItem("user")))
            })
    }

    const updatePost = () => {
        if (title.length < 5 || message.length < 10) {
            alert("Minimální velikost titulku musí být 5 a textu 10")
            return
        }
        axios.post('http://localhost:3002/editpost', {
            title: title,
            message: message,
            post_id: post.post_id,
            post_author_id: user.user_id
        }).then(response => {
            if (response.data.status === "OK") {
                alert("Příspěvek byl upraven")
            }
        })
    }

    const deletePost = () => {
        if (window.confirm("Opravdu si přejete tento příspěvek odstranit?") == true) {
            axios.post('http://localhost:3002/deletepost', {
                post_id: post.post_id,
                post_author_id: user.user_id
            }).then(response => {
                if (response.data.status === "OK") {
                    alert("Příspěvek byl smazán")
                    document.location.replace('/')
                }
            })
        }

    }
    return (
        <Container className='mt-5 fadeIn bg-light box-shadow flex container-wrap post-container p-4'>
            {user.notlogged === true ?
                <div>
                    Pro upravení příspěvku se musíte přihlásit <Link to='/login'>zde</Link>
                </div>
                :
                <Form>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Titulek"
                            className="mb-3 form-input"


                        >
                            <Form.Control type="text" placeholder="titulek" onChange={e => setTitle(e.target.value)} value={title} />
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
                        <Link type="button" className='post-button' to={`/post/${params.id}`}>
                            Zobrazit
                        </Link>
                        <Button type="button" className='post-button mx-3' onClick={() => updatePost()}>
                            Upravit
                        </Button>
                        <Button type="button" className='post-button' onClick={() => deletePost()}>
                            Smazat
                        </Button>
                    </div>
                </Form>
            }
        </Container >
    )
}

export default EditPost