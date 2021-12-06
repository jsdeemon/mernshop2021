import express from 'express'; 
const router = express.Router()

// import controllers 
import { authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
 } from '../controllers/userController.js';

 import { protect, admin } from '../middleware/authMiddleware.js';


 // register user and get all users (for admon)
 router.route('/').post(registerUser).get(protect, admin, getUsers)
// auth user
router.post('/login', authUser)
// get user profile // update user profile
router.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile)
// delete user(for admin) // get user by id // update user
router.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser)


export default router; 