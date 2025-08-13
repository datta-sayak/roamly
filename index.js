/*
import dotenv from "dotenv"
import connectDB from "./database/connection.js";
import app from "./app.js"

dotenv.config()

connectDB()
    .then( () => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        })
    })
    .catch( (err) => {
        console.log("MONGODB failed at index.js || ERROR: ",err);
    })
*/