import express from 'express'; 
const router = express.Router()

// import controllers 
import { 
    addOrderItems,
    getOrderById
 } from '../controllers/orderController.js';

 import { protect } from '../middleware/authMiddleware.js';


 // add order
 router.route('/').post(protect, addOrderItems)
// select order by id 
router.route('/:id').get(protect, getOrderById)



export default router; 