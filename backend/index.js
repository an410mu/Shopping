import "express-async-errors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import products from "./data/products.js";
import mongoose from "mongoose";
// const express = require("express");
//In package.json, once add type:module, able to use import like frontend
//need to add .js for file, and change from module.exports to export default
import productRoutes from "./router/productRoutes.js";
import userRoutes from "./router/userRoutes.js";
import orderRoutes from "./router/orderRoutes.js";
import { errorHandler } from "./middleware/errorMiddleWare.js";
const app = express();
dotenv.config();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/order", orderRoutes);

// app.use(notFound);
app.use(errorHandler);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.get("/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoConnected @: ${conn.connection.host}`);
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
