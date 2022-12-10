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
    header('driverlicid', 'Invalid ID of Driver License. It must be 17 char length.').isLength({min:10, max:10}),
    header('vin', 'Invalid VIN code. It must be 10 char length.').isLength({min:17, max:17}),
    header('personalphoto', 'Invalid value. Personal photo is not a string').isString(),
    header('techcertfront', 'Invalid value. Tech Cert frontside image is not a string').isString(),
    header('techcertback', 'Invalid value. Tech Cert backside image is not a string').isString(),
    header('driverlicfront', 'Invalid value. Driver License frontside image is not a string').isString(),
    header('driverlicback', 'Invalid value. Driver License backside image is not a string').isString()
];

export const loginValidation = [
    header('phonenumber', 'Invalid Phone Number').isMobilePhone('uk-UA'),
    header('password', 'Invalid Password. It must be longer then 8 ch.').isLength({ min: 8 })
];