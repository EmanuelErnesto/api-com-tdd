import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

export const zodIdValidation =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(request.params);
      next();
    } catch (error) {
      let err = error;
      if (err instanceof ZodError) {
        err = err.issues.map(zodErr => ({
          path: zodErr.path[0],
          message: zodErr.message,
        }));
      }
      return response.status(400).json({
        code: 400,
        status: 'Bad Request',
        message: 'Zod validation Failed',
        details: err,
      });
    }
  };
