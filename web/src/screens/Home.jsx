import React, { useState, useEffect } from 'react'
import axios from "axios"
import SinglePost from '../components/SinglePost'
import { Container, InputGroup, FormControl } from "react-bootstrap"
function Home() {

    const [posts, setPosts] = useState([])
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        loadPosts()
    }, [])

    // filtrovani prispevku pomoci inputu a titulku prispevku 
    const searchPosts = (value) => {
        axios.post('http://localhost:3002/search', {
            value: value
        })
            .then(response => setPosts(response.data))
    }

    // prvotni nahrani prispevku do posts
    const loadPosts = () => {
        axios.get("http://localhost:3002/posts")
            .then(response => setPosts(response.data))
    }

    return (
        <div className='pb-5'>
            <Container className='mt-5 form-input fadeIn box-shadow flex container-wrap post-container'>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Hledat"
                    className="p-3"
                    onChange={(e) => searchPosts(e.target.value)}
                />
            </Container>
            {posts.map(post => (
                <SinglePost key={post.post_id} data={post} />
            ))}
        </div>
    )
}

export default Home