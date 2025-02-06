import { Router } from 'express';
import {
  getUsers, createUser, findUserById, updateProfile, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', findUserById);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

export default router;
