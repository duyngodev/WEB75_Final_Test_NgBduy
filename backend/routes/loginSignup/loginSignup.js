import express from "express";
import {
  userLogin,
  userSignup,
  userLogout,
} from "../../controller/loginRegister.controller.js";
import { tokenValidator } from "../../middleware/validToken.middleware.js";

export const loginRouter = express.Router();

loginRouter.route("/login").post(userLogin);

loginRouter.route("/register").post(userSignup);

loginRouter.route("/logout").delete(tokenValidator, userLogout);
