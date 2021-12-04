import express from 'express'; 
const router = express.Router()

// import controllers 
import { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
 } from '../controllers/orderController.js';

 import { protect } from '../middleware/authMiddleware.js';


 // add order
 router.route('/').post(protect, addOrderItems)


// payment route - PayPal
router.route('/:id/pay').put(protect, updateOrderToPaid)

// get all orders
router.route('/myorders').get(protect, getMyOrders)
// select order by id 
router.route('/:id').get(protect, getOrderById)
export default router; 