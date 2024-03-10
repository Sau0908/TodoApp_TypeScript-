import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute";
import taskRouter from "./routes/taskRoute";



dotenv.config();
const app: Application = express();
const port: number = parseInt(process.env.PORT!) || 8001;


app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected with server");
  })
  .catch((err: Error) => {
    console.error(err);
  });


app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);



app.listen(port, () => console.log(`Listening on localhost:${port}`));

