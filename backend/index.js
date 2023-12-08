import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/userRoutes.js";
import actionrRouter from "./Routers/actionRoutes.js";
import uploadRouter from "./Routers/uplodeRoutes.js";


dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });


const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/post", actionrRouter);
app.use("/api/upload", uploadRouter);



  app.listen(port, "0.0.0.0", function () {
    console.log(`Server is running on port ${port}`);
  });