import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
// actions
import { saveShippingAddress } from '../actions/cartActions'
// input validator 
// import { inputValidator, comparePasswords } from '../utils/inputValidator'
// constants 
import { SHOULD_LOGIN } from '../constants/messageConstants'

const ShippingScreen = () => {


    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart  


    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const userLogin = useSelector(state => state.userLogin) 
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address, city, postalCode, country
        }))

        navigate('/payment')
    }


    useEffect(() => {
        if(!userInfo) {
            navigate(`/login?message=${SHOULD_LOGIN}`)
        }
    }, [userInfo, navigate])

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}
          >

                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                     {
                     //    inputValidator('Address', address, 3, 'dang')
                    }
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter city'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                     {
                      //   inputValidator('City', city, 2, 'dang')
                    }
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                     {
                       //  inputValidator('Postal code', postalCode, 5, 'dang')
                    }
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter country name'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                     {
                       //  inputValidator('Country', country, 3, 'dang')
                    }
                </Form.Group>

                <Button 
                className={'btn-shipping'}
                type='submit' variant='primary'>
                    Continue
                </Button>

              </Form>  
        </FormContainer>
    )
}

export default ShippingScreen
