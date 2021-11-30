import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
// components
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
// action 
import { listProductDetails } from '../actions/productActions'
// axios
// import axios from 'axios';
// import products from '../products';



const ProductScreen = () => {

// setting quantity
const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
   // const [product, setProduct] = useState({}) 
    const params = useParams();
   // const id = params.id; 

const productDetails = useSelector(state => state.productDetails)

const {loading, error, product} = productDetails

    useEffect(() => {

        document.title = product.name
        // document.getElementById('content').content = product.description
        document.getElementsByTagName('meta')[2].content = product.description
        dispatch(listProductDetails(params.id))
        // setting document title 
        
        // const fetchPproduct = async () => {
        //     const { data } = await axios.get(`/api/products/${params.id}`); // res.data 
        //     setProduct(data);
        // }
        // fetchPproduct();
     }, [dispatch, params, product])


     // adding history 
     const navigate = useNavigate()
     // Add to cart hndler 
     const addToCartHandler = () => {

        navigate(`/cart/${params.id}?qty=${qty}`)
     }

// console.log(product);
    return (
        <>
          <Link className={'btn btn-light my-3'} to='/'>
              Go back
          </Link>
          {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
               <Row>
               <Col md={6}>
                   <Image src={product.image} alt={product.name} fluid />
               </Col>
 
               <Col md={3}>
                   <ListGroup variant={'flush'}>
                       <ListGroup.Item>
                           <h3>{product.name}</h3>
                       </ListGroup.Item> 
                       <ListGroup.Item>
                           <Rating
                           value={product.rating}
                           text={`${product.numReviews} reviews`}
                           />
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Price: $ {product.price}
                       </ListGroup.Item> 
                       <ListGroup.Item>
                           Description: {product.description}
                       </ListGroup.Item> 
 
                   </ListGroup>
               </Col>
 
               <Col md={3}>
                   <Card>
                       <ListGroup variant={'flush'}>
 
                           <ListGroup.Item>
                               <Row>
                                   <Col>Price:</Col>
                                   <Col>
                                   <strong>$ {product.price}</strong>
                                   </Col>
                               </Row>
                           </ListGroup.Item>
 
                           <ListGroup.Item>
                               <Row>
                                   <Col>Status:</Col>
                                   <Col>
                                   {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                   </Col>
                               </Row>
                           </ListGroup.Item>

                           {product.countInStock > 0 && (
                               <ListGroup.Item>
                                   <Row>
                                       <Col>Qty</Col> 
                                       <Col>
                                       <Form.Control 
                                       as="select" 
                                       value={qty}
                                       onChange={(e) => setQty(e.target.value)}
                                       >
                                           {
                                           [...Array(product.countInStock).keys()].map(x => (
                                               <option 
                                                key={x + 1}
                                                value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                           ))
                                           }
                                            </Form.Control>
                                       </Col>
                                       
                                   </Row>
                               </ListGroup.Item>
                           )}

                           <ListGroup.Item>
                               <Button 
                               onClick={addToCartHandler}
                               className={'btn-block'}
                                type={'buttom'}
                                disabled={product.countInStock === 0}
                                >
                                   Add to Cart
                               </Button>
                           </ListGroup.Item>
 
                       </ListGroup>
                   </Card>
               </Col>
           </Row>

          )}
         
        </>
    )
}

export default ProductScreen
