import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { BlacklistToken } from "../middleware/validToken.middleware.js";

/*    
|   Method: POST
|   Desc:   login and createe TOKEN
|   Route:  /users/login
|   Public
*/
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Please enter all the filed!");
    const user = await userModel.findOne({ username });
    if (!user) throw new Error("Please enter the username");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Please enter the password");
    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });
    res.status(200).send(accessToken);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/*    
|   Method: POST
|   Desc:   register a new user
|   Route:  /users/register
|   Public
*/
const userSignup = async (req, res) => {
  try {
    const { username, password, repeatPassword } = req.body;
    if (!username || !password || !repeatPassword)
      throw new Error("Please enter all fields");
    const user = await userModel.findOne({ username });
    if (user) throw new Error("Username already in use");
    if (!validator.isStrongPassword(password))
      throw new Error(
        "Please enter a strong password with more than 8 characters, at least one number, one uppercase, one symbol."
      );
    if (password !== repeatPassword)
      throw new Error("Repeat password not matching. Please try again!");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await userModel.create({
      username,
      password: hash,
    });
    res.status(200).send(`${username} is created successfully`);
    res.send("ok");
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

/*    
|   Method: DELETE
|   Desc:   logout and blacklisted TOKEN
|   Route:  /users/logout
|   Public
*/
const userLogout = async (req, res) => {
  try {
    BlacklistToken.add(req.user.token);
    res.status(200).send("Logged out");
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};

export { userLogin, userSignup, userLogout };
