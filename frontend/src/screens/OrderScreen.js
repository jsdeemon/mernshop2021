import React, {useState, useEffect} from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// axios 
import axios from 'axios'
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
// actions
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
// constants 
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


const OrderScreen = () => {


    const navigate = useNavigate()
    // gettind  order id
    const params = useParams()
    const orderId = params.id 

    // setting paypal sdk 
    const [sdkReady, setSdkReady] = useState(false)

   // const navigate = useNavigate()

    const dispatch = useDispatch()

   
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin 

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails 

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay 

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver } = orderDeliver 


    if (!loading) {
          // calculate prices 
       const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)) 
    }
     

    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

     //   adding Paypal script 
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal') 
            const script = document.createElement('script') 
            script.type = 'text/javascript' 
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true 
            script.onLoad = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

      //  if paypal payment is success 
        if(!order || successPay || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

       // addPayPalScript()

    
       document.title = `Order No ${params.id}`
    }, [ navigate, params, dispatch, orderId, successPay, successDeliver, order ])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


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

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton 
                                        amount={order.totalPrice}
                                        onSuccesshandler={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}

                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button'
                                    onClick={deliverHandler}
                                    > Mark As Delivered 
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen
