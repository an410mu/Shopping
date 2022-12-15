import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userSchema.js";
import Product from "./models/productSchema.js";
import Order from "./models/orderSchema.js";

dotenv.config();
mongoose.set("strictQuery", false);
const conn = await mongoose.connect(process.env.MONGO_URL);

const importData = async () => {
  try {
    //clear database before import
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((ele) => {
      return {
        ...ele,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data imported succesfully!");
    process.exit();
  } catch (error) {
    console.log("This is error from import data", error);
    process.exit(1);
  }
};

const clearData = async () => {
  try {
    //clear database before import
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data cleared succesfully!");
    process.exit();
  } catch (error) {
    console.log("This is error from clear data", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  clearData();
} else {
  importData();
}
