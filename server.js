// For Development use command  'npm run dev'
// For Testing use command      'npm start' 

// All the imports
// node_modules
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { WebSocketServer } from "ws";
import { Server } from "socket.io";

// Personal modules
//      Router
import authRouter from "./Auth/authRouter.js";
//      Schemas
import { Passanger } from "./DB/passenger.js";
import { Driver } from "./DB/driver.js";
import { Order } from "./DB/order.js";
//      Extra modules for Orderig logic
import getPriceListAndDrivers from "./orderingModules/getPriceListAndDrivers.js";
import { MessageType, OrderStatus } from "./orderingModules/messageTypeEnum.js";


// Global constants and configs
const socket = { PORT: 3001, HOST: "127.0.0.1" };
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
//const wss = new WebSocketServer({ port: socket.PORT + 1 }, () => console.log("\n\t\tWSS have been started on PORT 3002..."));
app.use(express.json());
app.use('/auth', authRouter);


// Mongo Data Base connection
const dbURL = 'mongodb+srv://admin:iGaF8VrhyRZfUk2t@taxoappcluster.bjv5ryu.mongodb.net/TaxoAppTable?retryWrites=true&w=majority'
mongoose
    .connect(dbURL)
    .then(() => { console.log('\n\t\tDB connection success...\n') })
    .catch((error) => { console.log(error) });


// WSS code here
//      List of clients online
const currentClients = {};

io.on("connection", async (socketIO) => {

    try {
        const isDriver = socketIO.handshake.headers.isdriver;
        
        if (!isDriver) {
            const userDB = await Passanger.findById(socketIO.handshake.headers._id);
            currentClients[userDB._id] = socketIO;
            console.log(`UID: ${userDB._id}, the user ${userDB.firstName} is connected...`);

            let availableDrivers;
            let orderObj;
            let priceArr;
            let Dist;
            socketIO.on('message', async (msg) => {
                const msgObj = JSON.parse(msg);
                switch (msgObj.type) {
                    case MessageType.getTariffsAndDrivers:
                        Dist = msgObj.distance;
                        const priceListAndDrivers = (await getPriceListAndDrivers(msgObj.startPoint, Dist));
                        availableDrivers = priceListAndDrivers.drivers;
                        priceArr = priceListAndDrivers.tariffs;
                        socketIO.send(JSON.stringify(priceListAndDrivers));
                        break;

                    case MessageType.sendInviteToDrivers:
                        availableDrivers.forEach(driver => {
                            if (driver.tariff == msgObj.chosenTariff) {
                                orderObj = {
                                    passangerID: userDB._id,
                                    passengerFirstName: userDB.firstName,
                                    startAddress: msgObj.startAddress,
                                    endAddress: msgObj.endAddress,
                                    price: priceArr[msgObj.chosenTariff],
                                    distance: Dist,
                                };
                                currentClients[driver._id].send(JSON.stringify(orderObj));
                            } else console.log('\nERROR\n');
                        });
                        break;
                    
                    default:
                        ws.send('Wrong request');
                }
            });

            socketIO.on('close', () => {
                console.log('\nConnection is closed');
            });

        } else if (isDriver) {
            const userDB = await Driver.findById(socketIO.handshake.headers._id);
            currentClients[userDB._id] = socketIO;
            console.log(`UID: ${userDB._id}, the user ${userDB.firstName} is connected...`);
            
            socketIO.on('message', async (msg) => {
                let msgObj = JSON.parse(msg);
                switch (msgObj.type) {
                    case MessageType.orderConfirmedByDriver:
                        msgObj["orderStatus"] = OrderStatus.isConfirmed;
                        const order = new Order(msgObj);
                        console.log(order);
                        currentClients[order.passangerID].send(JSON.stringify(order));
                        break;
                    
                    default:
                        socketIO.send('Wrong request');
                }
            });
        }
    } catch (error) {
        socketIO.send(error.message);
    }
});



// Startpoint definition 
const start = () => {
    try {
        // Server Listener - Entrypoint
        httpServer.listen(socket.PORT, socket.HOST, () => console.log('\n\t\tServer have been started on PORT 3001...'));
    } catch (error) {
        console.log(error);
    }
}

// Startpoint execute
start();