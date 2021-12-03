import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
// actions
import { getOrderDetails } from '../actions/orderActions'


const OrderScreen = () => {

    // gettind  order id
    const params = useParams()
    const orderId = params.id 

    const navigate = useNavigate()

    const dispatch = useDispatch()

   


    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails 


    if (!loading) {
          // calculate prices 
       const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)) 
    }
     

    useEffect(() => {
       dispatch(getOrderDetails(orderId))
       document.title = `Order No ${params.id}`
    }, [ params ])


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <> 
    <h1>Order {order._id}</h1>
    <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                        <h2>Shipping</h2>
                       <p> <strong>Name: </strong> {order.user.name} </p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>
                            {order.user.email}
                        </a></p>
                        <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.address}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method:</h2>
                            <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            </p> 
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items:</h2>
                           {order.orderItems.length === 0 ? <Message>Order is empty!</Message> : (
                               <ListGroup variant='flush'>
                                   {order.orderItems.map((item, index) => (
                                       <ListGroup.Item key={index}>
                                           <Row>
                                               <Col md={1}>
                                                   <Image src={item.image} alt={item.name} fluid rounded />
                                               </Col>
                                               <Col>
                                               <Link to={`/product/${item.product}`}>
                                                   {item.name}
                                               </Link>
                                               </Col>
                                               <Col md={4}>
                                                   {item.qty} x ${item.price} = ${(Number((item.qty * item.price).toFixed(2))).toLocaleString()}
                                               </Col>
                                           </Row>
                                       </ListGroup.Item>
                                   ))}
                               </ListGroup>
                           )}
                        </ListGroup.Item>
                       
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${Number(order.itemsPrice).toLocaleString()}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${Number(order.taxPrice).toLocaleString()}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice.toLocaleString()}</Col>
                                </Row>
                            </ListGroup.Item>



                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen