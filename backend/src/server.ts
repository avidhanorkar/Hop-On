import express, { Express, Request, Response } from "express";
import { configDotenv } from "dotenv";
import connectDB from "./utils/db.js";
import router from "./router/routes.js";

const app: Express = express();
configDotenv();
app.use(express.json());

const port: string | undefined = process.env.PORT;
app.listen(port, () => {
    console.log(`✅ the server is up on port ${port}`)
})
connectDB();

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("trail route testing!!!")
});