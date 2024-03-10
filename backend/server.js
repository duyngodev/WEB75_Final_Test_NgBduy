import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { routeFactory } from "./routes/routes.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});
export { cloudinary };

const app = express();
const port = process.env.PORT || 3000;

// mongoDB connection
mongoose.connect(`${process.env.MONGO_URI}`);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("connected", () => console.log("connected to MongoDB"));

// middlware
app.use(express.json());
app.use(cors());

// routes
routeFactory(app);

// server connection
app.listen(process.env.PORT, () => {
  console.log(`listening on ${port}`);
});
