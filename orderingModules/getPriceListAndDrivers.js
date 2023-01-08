import geo from "node-geo-distance";
import { Driver } from "../DB/driver.js";

export default async function getPriceListAndDrivers(startPoint, distance) {
    
    const driversList = await getDriversNearBy(startPoint);
    const priceList = getPriceList(driversList, distance);
    const result = {
        tariffs: priceList,
        drivers: driversList
    };
    return result;
}

async function getDriversNearBy(startPoint) {
    const driversList = await Driver.find({ isAvailable: true }).lean();
    let driversNearBy = [];

    driversList.forEach(driver => {
        const coords = [ startPoint, {latitude: parseFloat(driver.coordinates.latitude), longitude: parseFloat(driver.coordinates.longitude)}];
        const distance = geo.haversineSync(coords[0], coords[1]);
        if (distance < 1600) {
            driversNearBy.push(driver);
        }
    });
    
    return driversNearBy;
}

function getAvailableTariffs(drivers) {
    let tariffIsAvailable = [];
    drivers.some(driver => {
        for (let tariffIndex = 0; tariffIndex < 3; tariffIndex++) {
            if (driver.tariff == tariffIndex) {
                tariffIsAvailable.push(true);
            } else {
                tariffIsAvailable.push(false);
            }
        }
    });
    return tariffIsAvailable;
}

function getPriceList(drivers, distance) {
    let priceList = [null, null, null];
    const tariffIsAvailable = getAvailableTariffs(drivers); // [false, false, true]
    for (let i = 0; i < 3; i++) {
        if (tariffIsAvailable[i]) {
            priceList[i] = calculatePriceForTariff(i, distance);
        }
        
    }
    
    return priceList;
}

function calculatePriceForTariff(tariffIndex, distance) {
    let price = coefficientsForPrices[tariffIndex].minPrice;
    if (distance > 6250) {
        price += (distance-6.25)*coefficientsForPrices[tariffIndex].grnPerKM;
    }
    price *= coefByCurrentTime();
    price = Math.round(price/10)*10;
    return Math.trunc(price);
}

const coefficientsForPrices = [
    { minPrice: 50, grnPerKM: 0.008 },
    { minPrice: 75, grnPerKM: 0.012 },
    { minPrice: 100, grnPerKM: 0.016 }
];

function coefByCurrentTime() {
    const d = new Date;
    const isMorning = d.getHours() > 6 && d.getHours() < 10;
    const isEvening = d.getHours() > 16 && d.getHours() < 20;
    if (isMorning || isEvening) {
        return 1.5;
    }
    return 1.1;
}