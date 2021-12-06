import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
// components 
import Message from '../components/Message'
import Loader from '../components/Loader'
// actions
import { listProducts, deleteProduct } from '../actions/productActions'
// constants 
import { SUCCESS_UPDATE } from '../constants/messageConstants'


const ProductListScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const [msg, setMsg] = useState('')
    const gotMessage = location.search ? location.search.split('=')[1] : ''

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    useEffect(() => {
        if (successDelete) {

                setMsg('Product was deleted')
         
        }
      
        if(userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            navigate('/login')
        }

        document.title = 'Product list'
       
    }, [dispatch, userInfo, navigate, successDelete]) 

const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')) {
      // DELETE PRODUCT
      dispatch(deleteProduct(id))
    }
 
}

const createProductHandler = (product) => {
    // CREATE PRODUCT
}



    return (
        <>
        {/* {msg && setTimeout(() => <Message variant='success'>{msg}</Message>, 2000)} */}

        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className={'text-end'}>
                <Button 
                variant="success"
                onClick={createProductHandler}
                className='my-3'>
                   <i className={'fas fa-plus'}></i> Create Product
                </Button>
            </Col>
        </Row>

       {loadingDelete && <Loader />}
       {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
       {successDelete && <Message variant='success'>{'Product was deleted'}</Message>}

        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {products ? products.map(product => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>
                           {product.category}
                        </td>
                        <td>{product.brand}</td>

                        <td>
                            <Link to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className={'fas fa-edit'}></i>
                                </Button>
                            </Link>

                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                <i className={'fas fa-trash'}></i>
                            </Button>
                        </td>
                    </tr>
                )) : <h1>No Products</h1> }

            </tbody>
        </Table>
        )}   
        </>
    )
}

export default ProductListScreen
