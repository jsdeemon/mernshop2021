import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
// actions
import { listOrders } from '../actions/orderActions'
// constants 
import { SUCCESS_UPDATE } from '../constants/messageConstants'


const OrderListScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const [msg, setMsg] = useState('')
    const gotMessage = location.search ? location.search.split('=')[1] : ''

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
       
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }
        document.title = 'Order list'
    }, [dispatch, userInfo, navigate]) 




    return (
        <>
        {msg && <Message variant='success'>{msg}</Message>}
        <h1>Orders</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {orders ? orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                            {order.isPaid ? order.paidAt.substring(0, 10) : (<i className='fas fa-times' style={{ color: 'red' }}></i>) }
                        </td>
                        <td>
                            {order.isDelivered ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times' style={{ color: 'red' }}></i>) }
                        </td>
                        <td>
                            <Link to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                 Details
                                </Button>
                            </Link>

                        </td>
                    </tr>
                )) : <h1>No Users</h1> }

            </tbody>
        </Table>
        )}   
        </>
    )
}

export default OrderListScreen
