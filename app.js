import express from "express"
import dotenv from "dotenv";
//import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded())
app.use('/public', express.static("public"))
//app.use(cookieParser())
app.set('view engine', 'ejs');

/* SERVER */
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
import connectDB from "./config/dbConnection.js";
connectDB();


/* ROUTES IMPORT */
import clientRouter from "./routes/client.routes.js";
import apiRouter from "./routes/api.routes.js";

/* ROUTES DECLARATION */
app.use('/api', apiRouter);
app.use('/', clientRouter);

export default app;