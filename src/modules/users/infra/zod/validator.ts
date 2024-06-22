import { zodValidation } from '@shared/infra/http/middlewares/zodValidation';
import { UserSchema } from './schemas/UserSchema';
import { ShowUserSchema } from './schemas/ShowUserSchema';
import { zodIdValidation } from '@shared/infra/http/middlewares/zodIdValidation';
import { UpdateUserSchema } from './schemas/UpdateUserSchema';
import { zodUpdateEntityValidation } from '@shared/infra/http/middlewares/zodUpdateEntityValidation';

export const validateUserCreate = zodValidation(UserSchema);

export const validateShowUser = zodIdValidation(ShowUserSchema);

export const validateUserUpdate = zodUpdateEntityValidation(UpdateUserSchema);
