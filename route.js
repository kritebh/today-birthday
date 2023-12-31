import express from "express";

//initialize router
const router = express.Router();

//local import
import convertNumberToMonth from "./utils/convertNumberToMonth.js";
import { checkCollection } from "./config/mongo.js";
import { cache } from "./config/cache.js";

router.get("/birthdays", async (req, res) => {
    try {
        let { day, month } = req.query;
        //check validity of day and month
        if (
            !day ||
            !month ||
            isNaN(day) ||
            isNaN(month) ||
            day < 1 ||
            day > 31 ||
            month < 1 ||
            month > 12
        ) {
            return res.status(400).send({
                error: "Invalid date format. Please ensure that both day and month are provided as valid numbers. Day should be between 1 and 31, and month should be between 1 and 12."
            });
        }

        day = parseInt(day);
        month = parseInt(month);

        //check which collection to find
        let monthInWord = convertNumberToMonth(month);
        let key = day + "_" + monthInWord;

        //try to get data from cache
        let data = await cache.get(key);

        if (data) {
            return res.send(data);
        }

        //get data from db
        let model = checkCollection(monthInWord);

        data = await model.aggregate([
            {
                $match: {
                    day: day,
                    month: monthInWord
                }
            },
            {
                $addFields: {
                    id: {
                        $substr: [
                            {
                                $toString: "$_id"
                            },
                            15,
                            24
                        ]
                    }
                }
            },
            {
                $project: {
                    createdAt: 0,
                    updatedAt: 0,
                    _id: 0
                }
            }
        ]);

        //set data in cache and return
        if (data) {
            await cache.set(key, data);
        }

        if (!data) {
            return res.status(404).send({ error: "No data found" });
        }

        return res.send(data);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ error: error.message || "Internal Server Error" });
    }
});

export default router;
