import express from 'express'; 
const router = express.Router()

// import controllers 
import { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid
 } from '../controllers/orderController.js';

 import { protect } from '../middleware/authMiddleware.js';


 // add order
 router.route('/').post(protect, addOrderItems)
// select order by id 
router.route('/:id').get(protect, getOrderById)

// payment route - PayPal
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router; 