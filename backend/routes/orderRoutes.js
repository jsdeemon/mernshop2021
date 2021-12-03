import express from 'express'; 
const router = express.Router()

// import controllers 
import { 
    addOrderItems
 } from '../controllers/orderController.js';

 import { protect } from '../middleware/authMiddleware.js';


 // add order
 router.route('/').post(protect, addOrderItems)



export default router; 