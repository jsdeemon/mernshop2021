import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// actions
import { login } from '../actions/userActions'
// validator 
import { inputValidator } from '../utils/inputValidator'
import { SHOULD_LOGIN } from '../constants/messageConstants'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')


    const dispatch = useDispatch() 

    const userLogin = useSelector(state => state.userLogin) 
    const { loading, error, userInfo } = userLogin 

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const navigate = useNavigate()




    let registerLink = '/register'; 
    if (redirect) {
        registerLink = `/register?redirect=${redirect}`
    }

    // console.log(redirect)
   
 

    useEffect(() => {
        if (redirect === SHOULD_LOGIN) {
            setMsg('You should login first')
        }
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo, redirect, msg])

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch login 
        dispatch(login(email, password))

    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {msg && <Message variant='warning'>{msg}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                     {
                        inputValidator('Email', email, 4, 'dang')
                    }
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    {
                        inputValidator('Password', password, 6, 'dang')
                    }
                </Form.Group>

                <Button
                className={'signInButton'}
                type='submit'
                variant='primary'
                  disabled={ (email.length <= 4) || (password.length <= 6) }
               //  disabled={ disableButtonValidator({emaili: 4, password: 6}) }
             //   disabled={false}
                >
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                New Customer?{' '}
                <Link to={ '/register' }>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
