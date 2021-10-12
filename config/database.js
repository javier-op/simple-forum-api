const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI).then(() => {
        console.log("Succesfully connected to database.")
    }).catch((error) => {
        console.log("Database connection failed. Exiting now...");
        console.error(error);
        process.exit(1);
    })
}
