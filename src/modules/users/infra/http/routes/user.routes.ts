import { Router } from 'express';
import UserController from '../controllers/UserController';
import {
  validateShowUser,
  validateUserCreate,
  validateUserUpdate,
} from '../../zod/validator';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.index);
userRoutes.post('/', validateUserCreate, userController.create);
userRoutes.get('/:id', validateShowUser, userController.show);
userRoutes.put('/:id', validateUserUpdate, userController.update);
userRoutes.delete('/:id', validateShowUser, userController.delete);

export default userRoutes;
