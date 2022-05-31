import React from 'react'
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
function NotFound() {
    return (
        <Container className='mt-5 fadeIn box-shadow flex container-wrap post-container p-4'>
            <p className='text-center pt-3'>
                Tato stránka neexistuje, pro vrácení na domovskou stránku klikněte <Link to="/" className='link'>zde</Link>
            </p>
        </Container>
    )
}

export default NotFound