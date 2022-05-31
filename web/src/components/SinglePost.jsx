import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
function SinglePost(data) {
    const post = data.data

    return (

        <Container className='mt-5 fadeIn box-shadow p-4 flex container-wrap post-container'>
            <Row>
                <Col sm={8}>
                    <h4 className='post-title mt-2'>{post.post_title}</h4>
                </Col>
                <Col sm={4} className="d-flex justify-content-end">
                    <p className='post-author'>{post.user_name}</p>
                </Col>
            </Row>
            <div>

            </div>
            <p className="px-3 mt-1 pb-4">{post.post_message}</p>
            <div className="mt-2 ml-4 px-3">
                <Link to={`/post/${post.post_id}`} className='post-button'>Zobrazit</Link>
            </div>
        </Container>


    )
}

export default SinglePost