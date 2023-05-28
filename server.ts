import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import properties from './src/config/properties';
import connectDB from './src/config/db';
import userRouter from "./src/api/routers/userRouter";

dotenv.config();
connectDB(properties.MONGO_URI);

const app:Express = express();

const port:number = properties.PORT;
const serverUrl:string = properties.SERVER_URL;

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);



app.get("/",async (req:Request, res:Response) => {
  return res.send(`<h1>Running on Port : ${port}</h1>`);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Open Browser: http://localhost:${port}`);
});
