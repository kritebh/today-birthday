import express from "express";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";

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

//rate limit setup
const apiLimiter = rateLimit({
	windowMs: 1000, // 1 second
	max: 1, // Limit each IP to 100 requests per `window` (here, per 1 second)
	standardHeaders: 'draft-7', // Set `RateLimit` and `RateLimit-Policy`` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;
const host = "127.0.0.1";
app.listen(PORT, host, () => {
    console.log(`Server is started`);
});

//api for birthday
app.use("/api/v1",apiLimiter,router);
