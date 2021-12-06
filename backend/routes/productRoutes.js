import express from 'express'; 
// express async handler
// import asyncHandler from 'express-async-handler';
const router = express.Router()
// import Product from '../models/productModel.js';

// import controllers 
import { getProducts, 
    getProductById, 
    deleteProduct, 
    updateProduct, 
    createProduct} from '../controllers/productController.js'
// import middleware for protection 
import { protect, admin } from '../middleware/authMiddleware.js'


// getting all products
router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id').get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct)

// @desc    fetch all products
// @route   GET /api/products
// @access  Public

// router.get(
//     '/', 
// asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     // res.status(401)
//     // throw new Error('Not authorized')
   
//     res.json(products)
// }))


// @desc    fetch single product
// @route   GET /api/products/:id
// @access  Public

// router.get(
//     '/:id', 
//     asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)

//     if(product) {
//         res.json(product)
//     } else {
//         res.status(404)
//         throw new Error('Product not found')
//         // json({ message: 'Product not found' })
//     }

// }))


export default router; 