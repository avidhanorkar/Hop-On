import express, { Express, Request, Response } from "express";
import { configDotenv } from "dotenv";

const app: Express = express();
configDotenv();

const port: string | undefined = process.env.PORT;

app.listen(port, () => {
    console.log(`the server is up on port ${port}`)
})

app.get("/", (req: Request, res: Response) => {
    res.send("trail route testing!!!")
});