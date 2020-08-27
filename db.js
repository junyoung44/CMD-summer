import mongoose from "mongoose"

mongoose.connect(
    "mongodb://localhost:27017/comedu",{
        useNewUrlParser : true,
        useFindAndModify :false,
    }
)

const db=mongoose.connection;

db.once("open", handleOpen);
db.on("error",handleError);