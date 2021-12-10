import express from 'express'; 
const router = express.Router()

// import controllers 
import { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
 } from '../controllers/orderController.js';

 import { protect, admin } from '../middleware/authMiddleware.js';


 // add order, get all orders
 router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)


// payment route - PayPal
router.route('/:id/pay').put(protect, updateOrderToPaid)

// update to delivered
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

// get all orders
router.route('/myorders').get(protect, getMyOrders)
// select order by id 
router.route('/:id').get(protect, getOrderById)
export default router; 