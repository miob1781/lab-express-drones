// Iteration #1
const drones = [
    {
        name: "Flyer",
        propellers: 2,
        maxSpeed: 10,
    },
    {
        name: "High Flyer",
        propellers: 4,
        maxSpeed: 16,
    },
    {
        name: "Super Flyer",
        propellers: 8,
        maxSpeed: 22,
    }
]

// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Drone = require("../models/Drone.model");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
        return Drone.create(drones)
    })
    .then((dronesFromDB) => {
        console.log("number of drones created: " + dronesFromDB.length)
        mongoose.connection.close()
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });
