import { Router } from "express";
import { userController } from "../controller/userController";

const userRouter = Router();

userRouter.put('/alterar-senha', userController.changePassword);
userRouter.post('/create', userController.createUser);

export{ userRouter };

