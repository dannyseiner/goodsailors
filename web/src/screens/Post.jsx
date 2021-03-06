import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import { Container, Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Pencil, ArrowReturnLeft } from "react-bootstrap-icons"
function Post() {

    const [data, setData] = useState({})
    const [user, setUser] = useState(false)
    const params = useParams()

    useEffect(() => {
        getPost()
        // kontrola zdali je uzivatel prihlasen
        if (sessionStorage.getItem("user") !== null) {
            setUser(JSON.parse(sessionStorage.getItem("user")))
        }
    }, [])

    // select z databaze prispevku
    const getPost = () => {
        axios.get(`http://localhost:3002/post/${params.id}`)
            .then(response => {
                // kontrola zdali prispevek existuje
                if (response.data.length === 0) {
                    document.location.replace("/notfound")
                    return
                }
                setData(response.data[0])
            })
    }

    return (
        <Container className='mt-5 fadeIn box-shadow flex container-wrap post-container'>
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
                <p className="px-3 mt-1">{data.post_message}</p>
                <div className="div-center">
                    <Link to={`/`} className='post-button linear-g-2'>
                        <ArrowReturnLeft size={23} />
                    </Link>
                    {/* kontrola zdali je uzivatel autorem prispevku a kdyz ano vypis menu pro upraveni */}
                    {user.user_id === data.post_author_id ? <Link to={`/edit/${data.post_id}`} className='post-button mx-2'>
                        <Pencil size={23} />
                    </Link> : ""}
                </div>
            </div>
        </Container>


    )
}

export default Post