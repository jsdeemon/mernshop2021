import express from 'express'; 
const router = express.Router()

// import controllers 
import { authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
 } from '../controllers/userController.js';

 import { protect } from '../middleware/authMiddleware.js';


 // register user 
 router.route('/').post(registerUser)
// auth user
router.post('/login', authUser)
// get user profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)





export default router; 