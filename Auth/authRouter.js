import { Router } from "express";
import { header, validationResult } from "express-validator";
import { passengerValidation } from "../Validations/registrValidation.js";
import { authControllerObj } from "./authController.js";
const authRouter = new Router();

authRouter.post('/registrationPassenger/',
                passengerValidation,
                authControllerObj.registrationPassenger);
authRouter.post('/registrationDriver/', authControllerObj.registrationDriver);
authRouter.post('/login/', authControllerObj.login);

export default authRouter;