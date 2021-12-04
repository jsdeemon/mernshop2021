import Rating from './Rating';
import {Card, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Product = ({product}) => {


    // adding history 
    const navigate = useNavigate()
    // Add to cart hndler 
    const addToCartHandler = () => {

       navigate(`/cart/${product._id}?qty=1`)
    }

    return (
        <Card className="my-3 p-3 rounded">
          <Link to={`/product/${product._id}`} >
          <Card.Img src={product.image} variant="top" />
          </Link>

<Card.Body>
<Link to={`/product/${product._id}`} >
         <Card.Title as='div'><strong>
             {product.name}
             </strong></Card.Title>
          </Link>
          <Card.Text as='div'>
           <Rating 
        //    color='orange'
           value={product.rating}
           text={`${product.numReviews} reviews`}
           />
          </Card.Text>

          <Card.Text as='h3'> 
          $ {product.price}
          </Card.Text>
          <Button 
          className={'btn-md'}
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
          variant="dark"><i className={'fas fa-shopping-cart'}></i>.Add to cart</Button>
</Card.Body>

        </Card>
    )
}

export default Product
