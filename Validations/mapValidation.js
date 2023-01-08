import { header } from "express-validator";

export const tariffValidation = [
    header('startlongitude', 'No longitude of start-point in Requst.').notEmpty(),
    header('startlatitude', 'No latitude of start-point in Requst.').notEmpty(),
    header('endlongitude', 'No longitude of end-point in Requst.').notEmpty(),
    header('endlatitude', 'No latitude of end-point in Requst.').notEmpty(),
];

export const tariffIndexValidation = [
    header('index', 'No Tariff Index in Requst').notEmpty()
];

export const coordinatesValidation = [
    header('longitude', 'No longitude in Requst.').notEmpty(),
    header('latitude', 'No latitude in Requst.').notEmpty(),
];
