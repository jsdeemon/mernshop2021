import express from 'express'; 
const router = express.Router()

// import controllers 
import { authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser
 } from '../controllers/userController.js';

 import { protect, admin } from '../middleware/authMiddleware.js';


 // register user and get all users (for admon)
 router.route('/').post(registerUser).get(protect, admin, getUsers)
// auth user
router.post('/login', authUser)
// get user profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
// delete user(for admin)
router.route('/:id').delete(protect, admin, deleteUser)


export default router; 