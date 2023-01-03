import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const protect = async (req, res, next) => {
  let token;

  console.log(req.headers.authorization);

  if (!req.headers.authorization) {
    throw Error("Unauthorized");
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userID);
      console.log(decoded);
      next();
    } catch (err) {
      res.json({});
      throw Error("Unauthorized");
    }
  }
};

export { protect };
