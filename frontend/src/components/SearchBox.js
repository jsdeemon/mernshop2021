import React, { useState } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'

const SearchBox = () => {

    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
 
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler}>
            <Row>
                <Col>
              
            <Form.Control 
            type='text' 
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search...'
            className={'mr-sm-2 ml-sm-5'}
            >
            </Form.Control>
            </Col>
            <Col>
            <Button
            disabled={keyword.length === 0}
            type='submit'
            variant='outline-warning'
            className='p-2'
            >
                Search
            </Button>
            </Col>
            </Row>
        </Form>
    )
}

export default SearchBox
