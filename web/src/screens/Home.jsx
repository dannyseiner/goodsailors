import React, { useState, useEffect } from 'react'
import { Container } from "react-bootstrap"
import axios from "axios"
import SinglePost from '../components/SinglePost'
function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = () => {
        axios.get("http://localhost:3002/posts")
            .then(response => setPosts(response.data))
    }

    return (
        <div className='pb-5'>
            {posts.map(post => (
                <SinglePost key={post.post_id} data={post} />
            ))}
        </div>
    )
}

export default Home