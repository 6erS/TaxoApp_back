import { Router } from "express";
import { authControllerObj } from "./authController.js";
const authRouter = new Router();

authRouter.post('/registrationPassenger/', authControllerObj.registrationPassenger);
authRouter.post('/registrationDriver/', authControllerObj.registrationDriver);
authRouter.post('/login/', authControllerObj.login);

export default authRouter;