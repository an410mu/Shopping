import User from "../models/userSchema.js";

//Auth user and get token
//POST /users/login

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: null,
      });
    } else {
      res.json({ message: "invalid" });
    }
  } catch (err) {
    console.log(err);
  }
};

export { authUser };
