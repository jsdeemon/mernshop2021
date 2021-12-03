import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
      <Container>
<Row>
      
    <Nav className='justify-content-center mb-4'>
        <Col md={3}>
      <Nav.Item>
        {step1 ? (
          <Link to='/login'>
              <span>Sign In</span> 
           {/* <Nav.Link>Sign In</Nav.Link> */}
          </Link>
        ) : (
          <span disabled>Sign In</span> 
          // <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      </Col>

      <Col md={3}>
      <Nav.Item>
        {step2 ? (
          <Link to='/shipping'>
            <span>Shipping</span> 
            {/* <Nav.Link>Shipping</Nav.Link> */}
          </Link>
        ) : (
          <span disabled>Shipping</span> 
          // <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      </Col>

      <Col md={3}>
      <Nav.Item>
        {step3 ? (
          <Link to='/payment'>
              <span>Payment</span> 
            {/* <Nav.Link>Payment</Nav.Link> */}
          </Link>
        ) : (
          <span disabled>Payment</span> 
          // <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      </Col>

      <Col md={3}>
      <Nav.Item>
        {step4 ? (
          <Link to='/placeorder'>
              <span>Order</span> 
            {/* <Nav.Link>Order</Nav.Link> */}
          </Link>
        ) : (
          <span disabled>Order</span> 
          // <Nav.Link disabled>Order</Nav.Link>
        )}
      </Nav.Item>
      </Col>


    </Nav>
    </Row>
    </Container>
  )
}

export default CheckoutSteps
