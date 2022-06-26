import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import cors from 'cors'

db.on("error", console.log.bind(console, 'Connection error'))
db.once("open", () => {
    console.log('Database connected successfully')
})

const app = express();
app.use(express.json(), cors())
routes(app);

export default app