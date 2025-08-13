import express from "express"
import path from 'path'
import { fileURLToPath } from 'url';
//import cors from "cors"
//import cookieParser from "cookie-parser";

const app = express();
/*
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
*/

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded())
app.use('/public', express.static("public"))
//app.use(cookieParser())

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/tour', (req, res) => {
    res.render('tour.ejs');
});

app.get('/signin', (req, res) => {
    res.render('sign_in.ejs');
});

app.listen(3000, () => {
    console.log("listening on port 3000");
})
/* routes import*/
//import userRouter from './routes/user.routes.js'

/* routes declaration */
//app.use("/users", userRouter)

export default app;