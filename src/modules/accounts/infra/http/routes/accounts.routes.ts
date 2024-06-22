import { Router } from 'express';
import {
  validateAccountCreate,
  validateAccountList,
  validateAccountShow,
  validateAccountUpdate,
} from '../../zod/validator';
import AccountsController from '../controller/AccountsController';

const accountsRouter = Router();

const accountsController = new AccountsController();

accountsRouter.post(
  '/:user_id/accounts',
  validateAccountCreate,
  accountsController.create,
);

accountsRouter.get(
  '/:user_id/accounts',
  validateAccountList,
  accountsController.index,
);

accountsRouter.get(
  '/:user_id/accounts/:id',
  validateAccountShow,
  accountsController.show,
);

accountsRouter.put(
  '/:user_id/accounts/:id',
  validateAccountUpdate,
  accountsController.update,
);

accountsRouter.delete(
  '/:user_id/accounts/:id',
  validateAccountShow,
  accountsController.remove,
);

export default accountsRouter;
