import { Router } from "express";

import { createUser, loginUser } from "../controllers/userController.js";
import validationSchema from "../middlewares/schemaMiddleware.js";
import schemaLogin from "../schemas/schemaLogin.js";
import schemaUser from "../schemas/schemaUser.js";

const userRouter = Router();

userRouter.post('/sign-up', validationSchema(schemaUser), createUser);
userRouter.post('/sign-in', validationSchema(schemaLogin), loginUser);

export default userRouter;
