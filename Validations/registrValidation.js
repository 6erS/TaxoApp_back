import { header } from 'express-validator';

export const passengerValidation = [
    header('phonenumber', 'Invalid Phone Number').isMobilePhone('uk-UA'),
    header('firstname', 'Invalid First Name. It must be longer then 2 ch.').isLength({ min: 2 }),
    header('secondname', 'Invalid Second Name. It must be longer then 2 ch.').isLength({ min: 2 }),
    header('password', 'Invalid Password. It must be longer then 8 ch.').isLength({ min: 8 })
];

export const driverValidation = [
    header('phonenumber', 'Invalid Phone Number').isMobilePhone('uk-UA'),
    header('firstname', 'Invalid First Name. It must be longer then 2 ch.').isLength({ min: 2 }),
    header('secondname', 'Invalid Second Name. It must be longer then 2 ch.').isLength({ min: 2 }),
    header('password', 'Invalid Password. It must be longer then 8 ch.').isLength({ min: 8 }),
    header('driverlicid', 'Invalid ID of Driver License. It must be 9 char length.').isLength({min:9, max:9}),
    header('vin', 'Invalid VIN code. It must be 17 char length.').isLength({min:17, max:17})
];

export const loginValidation = [
    header('phonenumber', 'Invalid Phone Number').isMobilePhone('uk-UA'),
    header('password', 'Invalid Password. It must be longer then 8 ch.').isLength({ min: 8 })
];