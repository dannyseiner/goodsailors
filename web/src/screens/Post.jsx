import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import { Container, Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

function Post() {

    const [data, setData] = useState({})
    const params = useParams()

    useEffect(() => {
        getPost()
    }, [])

    const getPost = () => {
        axios.get(`http://localhost:3002/post/${params.id}`)
            .then(response => setData(response.data[0]))
    }

    return (
        <Container className='mt-5 fadeIn bg-light box-shadow flex container-wrap post-container'>
            <img className='post-image' src="https://nystudio107-ems2qegf7x6qiqq.netdna-ssl.com/img/blog/_1200x675_crop_center-center_82_line/image_optimzation.jpg" />
            <div className="p-4">
                <Row>
                    <Col xs={12} md={10}>
                        <h4 className='post-title mt-2'>{data.post_title}</h4>
                    </Col>
                    <Col xs={6} md={2}>
                        <p className='post-author'>{data.user_name}</p>
                    </Col>
                </Row>
                <div>

                </div>
                <p className="px-3 mt-1 pb-4">{data.post_message}</p>
                <div className="div-center">
                    <Link to={`/home`} className='post-button'>Zpet</Link>
                </div>
            </div>
        </Container>


    )
}

export default Post