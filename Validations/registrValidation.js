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
    header('personalPhoto').notEmpty(),
    header('techCert').notEmpty(),
    header('driverLic').notEmpty()
];