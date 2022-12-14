import dotenv from "dotenv";
import express from "express";
import products from "./data/products.js";
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
app.listen(port, console.log(`Server listen to port ${port}`));
