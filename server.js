import express from "express";
import dotenv from "dotenv";

//local import
import { init } from "./config/mongo.js";
import { cacheInit } from "./config/cache.js";
import router from "./route.js";

//.env
dotenv.config();

//database connection
init();

//cache init
cacheInit();

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;
const host = "127.0.0.1";
app.listen(PORT, host, () => {
    console.log(`Server is started`);
});

//api for birthday
app.use("/api/v1", router);
