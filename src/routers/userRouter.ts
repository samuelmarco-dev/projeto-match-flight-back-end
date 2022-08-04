import { Router } from "express";
import { createUser } from "../controllers/userController.js";

import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaUser from "../schemas/schemaUser.js";

const userRouter = Router();

userRouter.post('/sign-up', validationSchema(schemaUser), createUser);

export default userRouter;
