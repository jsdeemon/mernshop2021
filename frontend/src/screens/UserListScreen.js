import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
// actions
import { listUsers, deleteUser } from '../actions/userActions'
// constants 
import { SUCCESS_UPDATE } from '../constants/messageConstants'


const UserListScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const [msg, setMsg] = useState('')
    const gotMessage = location.search ? location.search.split('=')[1] : ''

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        if (gotMessage === SUCCESS_UPDATE) {
            setMsg('User was successfully updated ')
        }
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
        document.title = 'User list'
    }, [dispatch, userInfo, navigate, successDelete, gotMessage]) 

const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')) {
        dispatch(deleteUser(id))
    }
 
} 



    return (
        <>
        {msg && <Message variant='success'>{msg}</Message>}
        <h1>Users</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {users ? users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`malito:${user.email}`}>{user.email}</a></td>
                        <td>
                            {user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : (<i className='fas fa-times' style={{ color: 'red' }}></i>) }
                        </td>
                        <td>
                            <Link to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className={'fas fa-edit'}></i>
                                </Button>
                            </Link>

                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                <i className={'fas fa-trash'}></i>
                            </Button>
                        </td>
                    </tr>
                )) : <h1>No Users</h1> }

            </tbody>
        </Table>
        )}   
        </>
    )
}

export default UserListScreen
