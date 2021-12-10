import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
// action 
import { listProducts } from '../actions/productActions'
// message constants
import { SUCCESS_REGISTER } from '../constants/messageConstants'

// import axios from 'axios';
// import products from '../products';

const HomeScreen = () => {

    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pagenumber || 1

// defining dispatch 
const dispatch = useDispatch(); 

const productList = useSelector(state => state.productList) 
const { loading, error, products, pages, page } = productList

const [msg, setMsg] = useState('')
    // const [products, setProducts] = useState([]);
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (redirect === SUCCESS_REGISTER) {
            setMsg('You successfully registered')
        }
        dispatch(listProducts(keyword, pageNumber))

    //    const fetchPproducts = async () => {
    //        const { data } = await axios.get('/api/products'); // res.data 
    //        setProducts(data);
    //    }
    //    fetchPproducts();
    }, [dispatch, redirect, keyword, pageNumber])

  

    return (
        <>
        <Meta />
        {!keyword && <ProductCarousel /> }
          {msg && <Message variant='success'>{msg}</Message>}
            <h1>Latest Products</h1>
            {loading ? (
           <Loader />
            ) : error ? ( 
            <Message variant="danger">{error}</Message>
            ) : (
            <>
            <Row>
                {products.map(product => (
                    <Col
                    key={product._id}
                    sm={12} md={6} lg={4} xl={3} >
                  <Product
                
                  product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate
            pages={pages} 
            page={page} 
            keyword={keyword ? keyword : ''}
            />
            </>
            )
            }
           
        </>
    )
}

export default HomeScreen
