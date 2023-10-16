import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";


const new_serviceValidation= Joi.object({
    serviceName: Joi.string().required(),
    description: Joi.string().required(),
    categoryId: Joi.number().required(),
    parentId: Joi.number().required(),
});

const validatedata = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      req.body = value;
      next();
    };
  };

export const newServiceMiddleware = validatedata(new_serviceValidation);

