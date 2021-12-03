import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
// actions
import { savePaymentMethod } from '../actions/cartActions'
// constants 
import { SHOULD_LOGIN } from '../constants/messageConstants'



const PaymentScreen = () => {

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart  

    if (!shippingAddress) {
        navigate('/shipping')
    }



    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    const userLogin = useSelector(state => state.userLogin) 
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod({ paymentMethod }))

        navigate('/placeorder')
       // console.log(paymentMethod);
    }


    useEffect(() => {
        if(!userInfo) {
            navigate(`/login?message=${SHOULD_LOGIN}`)
        }
    }, [userInfo, navigate])

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
          <h1>Payment method</h1>
          <Form onSubmit={submitHandler}
          >

            <Form.Group>
                <Form.Label as='legend'>
                    Select Method 
                </Form.Label>

            <Col>
            
            <Form.Check 
            type='radio' 
            label='Paypal or Credit Card'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
            >
            </Form.Check>
            
            {/*  can add another payment method */}

            {/* <Form.Check 
            type='radio' 
            label='Stripe'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
            >
            </Form.Check> */}

            </Col>
            </Form.Group>

                <Button 
                className={'btn-shipping'}
                type='submit' variant='primary'
                onClick={submitHandler}
                >
                    Continue
                </Button>

              </Form>  
        </FormContainer>
    )
}

export default PaymentScreen
