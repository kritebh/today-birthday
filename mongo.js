import mongoose from "mongoose";

export async function init() {
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Database Connected");
    } catch (error) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
    }
}

const Schema = mongoose.Schema;
const persons = new Schema({
    day: Number,
    name:String,
    year:Number,
    month: String,
    desc: String,
    wiki:String
},{timestamps:true});

const firstPartModel = mongoose.model("firstpart",persons);
const secondPartModel = mongoose.model("secondpart",persons);

const monthNumberMapping = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11
};

export function checkCollection(month) {
    let model =
        monthNumberMapping[month] < 6 ? firstPartModel : secondPartModel;
    return model;
}
