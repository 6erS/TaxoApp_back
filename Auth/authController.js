import { validationResult } from "express-validator";
import { Passanger } from "../DB/passenger.js";
import { Driver } from "../DB/driver.js";
import bcrypt from "bcrypt";

class authController {

    async registrationPassenger(req, res) {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ massege: 'Validation Error...', validationErrors })
        }

        try {
            const { phonenumber, firstname, secondname, password, personalphoto } = req.headers;
            console.log({   phoneNumber: phonenumber, 
                            firstName: firstname, 
                            secondName: secondname, 
                            password: password, 
                            personalPhoto: personalphoto 
                        });

            const candidate = [
                await Passanger.findOne({ phoneNumber: phonenumber }),
                await Driver.findOne({ phoneNumber: phonenumber })
            ];
            console.log(candidate);
            if (candidate[0] || candidate[1]) { return res.status(400).json("Registration Error. Already used phonenumber, please enter another."); }

            const passwordSalt = await bcrypt.genSalt(5);
            console.log(passwordSalt);
            const passwordHash = await bcrypt.hashSync(password, passwordSalt);
            const passenger = new Passanger({
                phoneNumber: phonenumber,
                firstName: firstname,
                secondName: secondname,
                password: {
                    hash: passwordHash,
                    salt: passwordSalt
                },
                personalPhoto: personalphoto
            });

            await passenger.save();
            return res.status(200).json({ massege: 'Registration success.', passenger });

        } catch (error) {
            console.log(error);
            res.status(400).json({ massege: error.massege });
        }
    }

    async registrationDriver(req, res) {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json(validationErrors);
        }
        try {
            const { phonenumber, firstname, secondname, password, personalphoto, techCert, driverLic } = req.headers;
            
            console.log({ 
                            phoneNumber: phonenumber,
                            firstName: firstname,
                            secondName: secondname,
                            password: password, 
                            personalPhoto: personalphoto, 
                            techCert: techCert,
                            driverLic: driverLic
                        });

            const candidate = [await Passanger.findOne({ phoneNumber: phonenumber }), await Driver.findOne({ phoneNumber: phonenumber })];
            console.log(candidate);
            if (candidate[0] || candidate[1]) { return res.status(400).json("Registration Error. Already used phonenumber, please enter another."); }

            const passwordSalt = await bcrypt.genSalt(5);
            console.log(passwordSalt);
            const passwordHash = await bcrypt.hashSync(password, passwordSalt);
            const passenger = new Driver({
                phoneNumber: phonenumber,
                firstName: firstname,
                secondName: secondname,
                password: {
                    hash: passwordHash,
                    salt: passwordSalt
                },
                personalPhoto: personalphoto,
                techCert: techCert,
                driverLic: driverLic
            });

            await passenger.save();
            return res.status(200).json({ massege: 'Registration success.', passenger });

        } catch (error) {
            console.log(error);
            res.status(400).json({ massege: " Registration Error " });
        }
    }

    async login(req, res) {
        try {
            res.status(200).json("auth/login/ - is working...");
        } catch (error) {
            console.log(error);
            res.status(400).json({ massege: " Login Error " });
        }
    }

}

export const authControllerObj = new authController();