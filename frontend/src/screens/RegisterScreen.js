import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// actions
import { register } from '../actions/userActions'
// message constants
import { SUCCESS_REGISTER } from '../constants/messageConstants'
// input validator 
import { inputValidator, comparePasswords } from '../utils/inputValidator'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch() 

    const userRegister = useSelector(state => state.userRegister) 
    const { loading, error, userInfo } = userRegister

    // const location = useLocation()
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    const navigate = useNavigate()


    let loginLink = '/'; 
    // if (redirect) {
    //     loginLink = `/`
    // }
 

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
              // dispatch register
        dispatch(register(name, email, password))
        navigate(`/?message=${SUCCESS_REGISTER}`)
        }
      
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='info'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

            <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                     {
                         inputValidator('Name', name, 3, 'dang')
                    }
                </Form.Group>

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

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                         {
                            inputValidator('Password', confirmPassword, 6, 'dang')
                       }
                       {
                             comparePasswords(password, confirmPassword, 'dang')
                       }
                </Form.Group>

                <Button
                className={'signInButton'}
                type='submit'
                variant='primary'
                disabled={ (name.length <= 3) || (email.length <= 4) || (password.length <= 6) || (confirmPassword.length <= 6) || (password !== confirmPassword) }
                >
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Have an accout?{' '}
                <Link to={ loginLink }>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
