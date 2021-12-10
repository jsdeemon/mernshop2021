// import {LinkContainer} from 'react-router-bootstrap'
import {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Navbar,
  Button,
   Nav, 
   Container,
   Row,
   Col 
  } from 'react-bootstrap';
import SearchBox from './SearchBox'
// actions
import { logout } from '../actions/userActions';





const Header = () => {


  const navigate = useNavigate()

  const dispatch = useDispatch()
  //getting user info 
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin 

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

// getting quantity of ordered goods
const cart = useSelector(state => state.cart)

const { cartItems } = cart
const qtyAll = cartItems.reduce((acc, item) => acc + item.qty, 0)


  // useEffect(() => {
    
  

  // }, [navigate])

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          
          <Link to="/">
          <Navbar.Brand>MERN Shop</Navbar.Brand>
          </Link>

          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <SearchBox />

            <Nav className="ms-auto">
           
                  {/* <Link to='/cart'>
                    <Button variant={''} className={'btn-sm'}><i className="fas fa-shopping-cart" style={{ }}> &nbsp;
                  
                  </i> Cart{qtyAll ? <sup className="qty">{qtyAll}</sup> : ''}</Button></Link> */}

              
                
                  <Link to={'/cart'}>
                  
  <i className="fas fa-shopping-cart" style={{ }}> Cart{qtyAll ? <sup className="qty">{qtyAll}</sup> : ''}</i> 
  
  </Link>
  

  {userInfo && userInfo.isAdmin && (
                  <>
                
                 
                   <Link to='/admin/userlist'>
                  <i className="fas fa-users"></i>  
                  </Link>
                
                 
                  <Link to='/admin/productlist'>
                  <i className="fas fa-list"></i> 
                  </Link>
                 
             
                  <Link to='/admin/orderlist'>
                  <i className="fas fa-list-alt"></i> 
                  </Link>
                 
                  
             
                  </>
                  )}

                  { userInfo ? (
        <>
                        <Link to='/profile'>
                      <i className="far fa-grin"> {userInfo.name}</i> 
                      </Link>
                      <i className="far fa-arrow-alt-circle-right" onClick={logoutHandler}> Logout</i>
                      </>
                  ) : (
                    <Link to='/login'>
                  <i className="fas fa-user"> Sign In</i> 
                  </Link>
                
                  ) }

                 

   
             
            </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>
        </header>
    )
}

export default Header
