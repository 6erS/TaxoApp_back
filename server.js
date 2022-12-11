// For Development use command  'npm run dev'
// For Testing use command      'npm start' 

// All the imports
// node_modules
import express from "express";
import mongoose from "mongoose";
// Personal modules
import authRouter from "./Auth/authRouter.js";

// Global constants and configs
const app = express();
app.use(express.json());
app.use('/auth', authRouter);

const socket = { PORT: 3001, HOST: "127.0.0.1"};


// Mongo Data Base connection
const dbURL = 'mongodb+srv://admin:iGaF8VrhyRZfUk2t@taxoappcluster.bjv5ryu.mongodb.net/TaxoAppTable?retryWrites=true&w=majority'
mongoose
    .connect(dbURL)
    .then( () => {console.log('\n\t\tDB connection success...\n')} )
    .catch( (error) => { console.log(error) });


const start = () => {
    try {
        // Server Listener - Entrypoint
        app.listen(socket.PORT, socket.HOST, () => console.log('\n\t\tServer have been started...\n'));
    } catch (error) {
        console.log(error);
    }
}


start();

// 401 - Ошибка проверки авторизации пользователя. Проверка выполняется везде, кроме Login Screen 