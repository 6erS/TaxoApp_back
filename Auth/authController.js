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

            const isUnique = [
                await Passanger.findOne({ phoneNumber: phonenumber }),
                await Driver.findOne({ phoneNumber: phonenumber })
            ];
            if (isUnique[0] || isUnique[1]) { return res.status(400).json("Registration Error. Already used phonenumber, please enter another."); }

            const passwordSalt = await bcrypt.genSalt(5);
            const passwordHash = await bcrypt.hashSync(password, 5);

            const passenger = new Passanger({
                phoneNumber: phonenumber,
                firstName: firstname,
                secondName: secondname,
                passwordHash: passwordHash,
                personalPhoto: personalphoto
            });

            await passenger.save();
            return res.status(200).json({ massege: 'Registration success.', passenger });

        } catch (error) {
            console.log(error);
            return res.status(400).json({ massege: error.massege });
        }
    }

    async registrationDriver(req, res) {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json(validationErrors);
        }
        try {
            const { phonenumber, firstname, secondname, password, personalphoto, techcertfront, techcertback, vin, driverlicfront, driverlicback, driverlicid } = req.headers;
            let isUnique = [
                await Passanger.findOne({ phoneNumber: phonenumber }),
                await Driver.findOne({ phoneNumber: phonenumber })
            ];
            if (isUnique[0] || isUnique[1]) { return res.status(400).json("Registration Error. Already used phonenumber, please enter another."); }
            
            isUnique = [
                await Driver.findOne({VIN: vin}),
                await Driver.findOne({driverLicID:driverlicid})
            ]
            
            if (isUnique[0]) { return res.status(400).json("Registration Error. Already used VIN."); }
            if (isUnique[1]) { return res.status(400).json("Registration Error. Already used Diver License."); }

            const passwordSalt = await bcrypt.genSalt(5);
            const passwordHash = await bcrypt.hashSync(password, 5);
            const driver = new Driver({
                phoneNumber: phonenumber,
                firstName: firstname,
                secondName: secondname,
                passwordHash: passwordHash,
                personalPhoto: personalphoto,
                techCert: [techcertfront, techcertback],
                VIN:vin,
                driverLic: [driverlicfront, driverlicback],
                driverLicID:driverlicid,
                tariff: (Math.floor(Math.random() * 3))
            });
            
            await driver.save();
            return res.status(200).json({ massege: 'Registration success.', driver });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ massege: " Registration Error " });
        }
    }

    async login(req, res) {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).json(validationErrors);
        }
        try {
            const {phonenumber, password} = req.headers;
            
            const unlogedUser = (await Passanger.findOne({ phoneNumber:phonenumber }) || await Driver.findOne({ phoneNumber:phonenumber }));
            if (!unlogedUser) {
                return res.status(400).json({ massege:"Account with such a Phone Number does not exist. Do you want to registrate one?" });
            }
            
            bcrypt.compare(password, unlogedUser.passwordHash).then((isPasswordCorrect) => {
                if (isPasswordCorrect) {
                    return res.status(200).json(unlogedUser);
                }
                return res.status(400).json({ massege: "Wrong password." });
            });

        } catch (error) {
            console.log(error);
            return res.status(400).json({ massege: " Login Error " });
        }
    }
}

export const authControllerObj = new authController();