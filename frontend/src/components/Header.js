// import {LinkContainer} from 'react-router-bootstrap'
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Header = () => {

// getting quantity of ordered goods
const cart = useSelector(state => state.cart)

const { cartItems } = cart
const qtyAll = cartItems.reduce((acc, item) => acc + item.qty, 0)

// console.log('qty: ', qty);
  useEffect(() => {
    
  

  }, [])

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          
          <Link to="/">
          <Navbar.Brand>MERN Shop</Navbar.Brand>
          </Link>

          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            
              {/* <Nav.Link> */}
                  <Link to='/cart'>
                  <i className="fas fa-shopping-cart" style={{ }}> Cart&nbsp;
                  {qtyAll ? <sup className="qty">{qtyAll}</sup> : ''}
                  </i> 
                  </Link>
                  {/* </Nav.Link> */}

                  {/* <Nav.Link> */}
                  <Link to='/login'>
                  <i className="fas fa-user" style={{  }}> Sign In</i> 
                  </Link>
                  {/* </Nav.Link> */}
              

              {/* <Link to="/login">
              <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>
              </Link> */}
             
            </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>
        </header>
    )
}

export default Header
