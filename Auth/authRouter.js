import { Router } from "express";
import { passengerValidation, driverValidation, loginValidation } from "../Validations/registrValidation.js";
import { authControllerObj } from "./authController.js";
const authRouter = new Router();

authRouter.post('/registrationPassenger/',
                passengerValidation,
                authControllerObj.registrationPassenger);
authRouter.post('/registrationDriver/',
                driverValidation,
                authControllerObj.registrationDriver);
authRouter.get('/login/',
                loginValidation, 
                authControllerObj.login);

export default authRouter;