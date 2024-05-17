import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfil,
  updateUserProfil,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import {protect, admin} from '../middleware/authMiddlware.js'

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profil').get(protect,getUserProfil).put(protect,updateUserProfil);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
