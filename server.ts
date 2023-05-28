import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app:Express = express();

app.use(cors());
app.use(express.json());

const port:number = Number(process.env.PORT) || 3000;

app.get("/",async (req:Request, res:Response) => {
  return res.send(`<h1>Running on Port : ${port}</h1>`);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Open Browser: http://localhost:${port}`);
});
