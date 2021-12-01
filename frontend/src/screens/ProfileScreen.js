import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
// actions
import { getUserDetails, updateUserProfile } from '../actions/userActions'
// input validator 
import { inputValidator, comparePasswords } from '../utils/inputValidator'

const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch() 

    const userDetails = useSelector(state => state.userDetails) 
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin) 
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile) 
    const { success } = userUpdateProfile

    // const location = useLocation()
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    const navigate = useNavigate()


    // let loginLink = '/login'; 
    // if (redirect) {
    //     loginLink = `/login?redirect=${redirect}`
    // }
 
console.log(user);
    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }

            setName(user.name)
        }
    }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
              // dispatch Update Profile
              dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
      
    }

    return (
     <Row>
         <Col xs={12} md={3}>

         <h2>User Profile</h2>
            {message && <Message variant='info'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
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
                      //   inputValidator('Name', name, 3, 'dang')
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
                       //  inputValidator('Email', email, 4, 'dang')
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
                          //  inputValidator('Password', password, 6, 'dang')
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
                          //  inputValidator('Password', confirmPassword, 6, 'dang')
                       }
                       {
                          //   comparePasswords(password, confirmPassword, 'dang')
                       }
                </Form.Group>

                <Button
                className={'signInButton'}
                type='submit'
                variant='primary'
                >
                    Update 
                </Button>
            </Form>

         </Col>
         <Col xs={12} md={9}>
             <h2>My Orders</h2>
         </Col>
     </Row>
    )
}

export default ProfileScreen

