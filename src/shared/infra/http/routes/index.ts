import accountsRoutes from '@modules/accounts/infra/http/routes/accounts.routes';
import userRoutes from '@modules/users/infra/http/routes/user.routes';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.status(200).send();
});
routes.use('/users', userRoutes);
routes.use('/users', accountsRoutes);

export default routes;
