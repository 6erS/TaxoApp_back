import { Passanger } from "../DB/passenger.js";
import { Driver } from "../DB/driver.js";
import bcrypt from "bcrypt";

class authController {
    
    async registrationPassenger(req, res) {
        try {
            const {phonenumber, firstname, secondname, password, personalphoto} = req.headers;
            console.log({phoneNumber: phonenumber, firstName: firstname, secondName: secondname, password, personalPhoto: personalphoto});
            
            const candidate = await Passanger.findOne({phoneNumber: nphonenumber});
            console.log(candidate); 
            if(candidate) { return res.status(400).json("Registration Error. Already used phonenumber, please enter another."); }
            
            const passwordHash = bcrypt.hashSync(password, 5);
            const passenger = new Passanger({
                phoneNumber: phonenumber,
                firstName: firstname,
                secondName: secondname,
                password: passwordHash,
                personalPhoto: personalphoto
            });

            await passenger.save();
            return res.status(200).json(passenger);
            
        } catch (error) {
            console.log(error);
            res.status(400).json({ massege:" Registration Error " });
        }
    }

    async registrationDriver(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(400).json({ massege:" Registration Error " });
        }
    }

    async login(req, res) {
        try {
            res.status(200).json("auth/login/ - is working...");
        } catch (error) {
            console.log(error);
            res.status(400).json({ massege:" Login Error " });
        }
    }

}

export const authControllerObj = new authController();