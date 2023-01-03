import User from "../models/userSchema.js";

//Auth user and get token
//POST /users/login

const getUser = async (req, res) => {
  //const existedUser = await User.findById(req.user._id);
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please enter all values");
  }

  const user = await User.findOne({ email }).select("+password");

  //need to work on custom error handle middleware
  if (!user) {
    res.send("user not found");
    throw new Error("User does not exist");
  }

  const checkPwd = await user.matchPassword(password);
  if (!checkPwd) {
    throw new Error("Invalid password");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({ user, token });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw Error("Please enter all fields");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw Error("email is already registed");
  }

  //select in the schema not working with the create, the password still get pass back
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(201).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

export { authUser, register, getUser };
