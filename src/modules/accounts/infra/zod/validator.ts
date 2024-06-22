import { zodUpdateEntityValidation } from '@shared/infra/http/middlewares/zodUpdateEntityValidation';
import { CreateAccountSchema } from './schemas/CreateAccountSchema';
import { zodIdValidation } from '@shared/infra/http/middlewares/zodIdValidation';
import { ListAccountSchema } from './schemas/ListAccountSchema';
import { ShowAccountSchema } from './schemas/ShowAccountSchema';
import { UpdateAccountSchema } from './schemas/UpdateAccountSchema';

export const validateAccountCreate =
  zodUpdateEntityValidation(CreateAccountSchema);

export const validateAccountList = zodIdValidation(ListAccountSchema);

export const validateAccountShow = zodIdValidation(ShowAccountSchema);

export const validateAccountUpdate =
  zodUpdateEntityValidation(UpdateAccountSchema);
