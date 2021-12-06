import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// actions
import { getUserDetails, updateUser } from '../actions/userActions'
//  constants
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { SUCCESS_UPDATE } from '../constants/messageConstants'
// input validator 
import { inputValidator } from '../utils/inputValidator'

const UserEditScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
  


    const params = useParams() 
    const userId = params.id 

    const dispatch = useDispatch() 

    const userDetails = useSelector(state => state.userDetails) 
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate) 
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

    const navigate = useNavigate()

    useEffect(() => {
        // if successfully updated 
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            navigate(`/admin/userlist?message=${SUCCESS_UPDATE}`)
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
     
    }, [user, userId, dispatch, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))
    }

    return (
        <>
        <Link to={'/admin/userlist'} className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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

                <Form.Group controlId="isadmin">
                    <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                       
                </Form.Group>

              

                <Button
                className={'signInButton'}
                type='submit'
                variant='primary'
                disabled={ (name.length <= 3) || (email.length <= 4) }
                >
                    Update
                </Button>
            </Form>

        )}
            

           
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen

