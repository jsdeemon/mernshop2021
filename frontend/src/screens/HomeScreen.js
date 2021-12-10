import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
// action 
import { listProducts } from '../actions/productActions'
// message constants
import { SUCCESS_REGISTER } from '../constants/messageConstants'
// import axios from 'axios';
// import products from '../products';

const HomeScreen = () => {

    const params = useParams()
    const keyword = params.keyword

// defining dispatch 
const dispatch = useDispatch(); 

const productList = useSelector(state => state.productList) 
const { loading, error, products } = productList

const [msg, setMsg] = useState('')
    // const [products, setProducts] = useState([]);
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (redirect === SUCCESS_REGISTER) {
            setMsg('You successfully registered')
        }
        dispatch(listProducts(keyword))

        document.title = 'All products'
        // document.getElementsByTagName("META")[2].content="Your description about the page or site here to set dynamically";

    //    const fetchPproducts = async () => {
    //        const { data } = await axios.get('/api/products'); // res.data 
    //        setProducts(data);
    //    }
    //    fetchPproducts();
    }, [dispatch, redirect, keyword])

  

    return (
        <>
          {msg && <Message variant='success'>{msg}</Message>}
            <h1>Latest Products</h1>
            {loading ? (
           <Loader />
            ) : error ? ( 
            <Message variant="danger">{error}</Message>
            ) : (<Row>
                {products.map(product => (
                    <Col
                    key={product._id}
                    sm={12} md={6} lg={4} xl={3} >
                  <Product
                
                  product={product} />
                    </Col>
                ))}
            </Row>)
            }
           
        </>
    )
}

export default HomeScreen
