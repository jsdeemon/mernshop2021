import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
// action 
import { listProducts } from '../actions/productActions'
// import axios from 'axios';
// import products from '../products';

const HomeScreen = () => {

// defining dispatch 
const dispatch = useDispatch(); 

const productList = useSelector(state => state.productList) 
const { loading, error, products } = productList

    // const [products, setProducts] = useState([]);


    useEffect(() => {

        dispatch(listProducts())

        document.title = 'All products'
        // document.getElementsByTagName("META")[2].content="Your description about the page or site here to set dynamically";

    //    const fetchPproducts = async () => {
    //        const { data } = await axios.get('/api/products'); // res.data 
    //        setProducts(data);
    //    }
    //    fetchPproducts();
    }, [dispatch])

  

    return (
        <>
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
