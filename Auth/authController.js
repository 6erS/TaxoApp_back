import { validationResult } from "express-validator";
import { Passanger } from "../DB/passenger.js";
import { Driver } from "../DB/driver.js";
import bcrypt from "bcrypt";

class authController {

    async registrationPassenger(req, res) {
        const validationErrors = validationResult(req);
        let registrationErrorMassage = { errors: [ { msg: 'Registration error.'} ] };
        if (!validationErrors.isEmpty()) {
            return res.status(400).json(validationErrors);
        }
        try {
            const { phonenumber, firstname, secondname, password } = req.headers;

            const isUnique = [
                await Passanger.findOne({ phoneNumber: phonenumber }),
                await Driver.findOne({ phoneNumber: phonenumber })
            ];
            if (isUnique[0] || isUnique[1]) { registrationErrorMassage.errors[0].msg="Registration Error. Already used phonenumber, please enter another."; return res.status(400).json(registrationErrorMassage); }
            const passwordHash = await bcrypt.hashSync(password, 5);

            const passenger = new Passanger({
                phoneNumber: phonenumber,
                firstName: firstname,
                secondName: secondname,
                passwordHash: passwordHash
            });

            await passenger.save();
            return res.status(200).json({ massege: 'Registration success.'});

        } catch (error) {
            console.log(error);
            registrationErrorMassage.errors[0].msg=error.toString();
            return res.status(500).json(registrationErrorMassage);
        }
    }

    async registrationDriver(req, res) {
        const validationErrors = validationResult(req);
        let registrationErrorMassage = { errors: [ { msg: 'Registration error.'} ] };
        if (!validationErrors.isEmpty()) {
            return res.status(400).json(validationErrors);
        }
        try {
            const { phonenumber, firstname, secondname, password, vin, driverlicid } = req.headers;
            let isUnique = [
                await Passanger.findOne({ phoneNumber: phonenumber }),
                await Driver.findOne({ phoneNumber: phonenumber })
            ];
            if (isUnique[0] || isUnique[1]) { registrationErrorMassage.errors[0].msg="Registration Error. Already used phonenumber, please enter another."; return res.status(400).json(registrationErrorMassage); }
            
            isUnique = [
                await Driver.findOne({VIN: vin}),
                await Driver.findOne({driverLicID:driverlicid})
            ]
            
            if (isUnique[0]) { registrationErrorMassage.errors[0].msg="Registration Error. Already used VIN."; return res.status(400).json(registrationErrorMassage); }
            if (isUnique[1]) { registrationErrorMassage.errors[0].msg="Registration Error. Already used Diver License."; return res.status(400).json(registrationErrorMassage); }

            const passwordSalt = await bcrypt.genSalt(5);
            const passwordHash = await bcrypt.hashSync(password, 5);
            const driver = new Driver({
                phoneNumber: phonenumber,
                firstName: firstname,
                secondName: secondname,
                passwordHash: passwordHash,
                VIN:vin,
                driverLicID:driverlicid,
                tariff: (Math.floor(Math.random() * 3))
            });
            
            await driver.save();
            return res.status(200).json({ massege: 'Registration success.'});

        } catch (error) {
            console.log(error);
            registrationErrorMassage.errors[0].msg=error.toString();
            return res.status(500).json(registrationErrorMassage);
        }
    }

    async login(req, res) {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json(validationErrors);
        }
        const loginErrorMassege = {
            errors:[
                {msg:"Wrong login or password"}
            ]
        }
        try {
            const {phonenumber, password} = req.headers;
            
            const unlogedUser = (await Passanger.findOne({ phoneNumber:phonenumber }) || await Driver.findOne({ phoneNumber:phonenumber }));
            if (!unlogedUser) {
                return res.status(400).json(loginErrorMassege);
            }
            
            bcrypt.compare(password, unlogedUser.passwordHash).then((isPasswordCorrect) => {
                if (isPasswordCorrect) {
                    return res.status(200).json(unlogedUser);
                }
                return res.status(400).json(loginErrorMassege);
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors:[ {msg:"Login Error"} ]});
        }
    }
}

export const authControllerObj = new authController();