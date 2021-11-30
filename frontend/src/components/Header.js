// import {LinkContainer} from 'react-router-bootstrap'
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Navbar,
   Nav, 
   Container 
  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// actions
import { logout } from '../actions/userActions';



const Header = () => {

  const dispatch = useDispatch()
  //getting user info 
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin 

  const logoutHandler = () => {
    dispatch(logout())
  }

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
           
                  <Link to='/cart'>
                  <i className="fas fa-shopping-cart" style={{ }}> Cart&nbsp;
                  {qtyAll ? <sup className="qty">{qtyAll}</sup> : ''}
                  </i> 
                  </Link>

                  { userInfo ? (
                    <div>
                   <Link to='/profile'>
                       <i className="far fa-grin"> {userInfo.name}</i> 
                   </Link>
                   
                    <i className="far fa-arrow-alt-circle-right"
                    onClick={logoutHandler}
                    > Logout</i> 
                
                </div>
                  ) : (
                    <Link to='/login'>
                  <i className="fas fa-user"> Sign In</i> 
                  </Link>
                  ) }

               
                 
              

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
