import dotenv from "dotenv";
import express from "express";
import products from "./data/products.js";
import mongoose from "mongoose";
// const express = require("express");
//In package.json, once add type:module, able to use import like frontend
//need to add .js for file, and change from module.exports to export default

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((ele) => ele._id === req.params.id);
  res.json(product);
});

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
