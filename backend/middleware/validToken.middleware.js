import jwt from "jsonwebtoken";

export const BlacklistToken = new Set();

export const tokenValidator = (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) throw new Error("User not authenticated");

    const token =
      headerToken.split(" ")[0] === "Bearer"
        ? headerToken.split(" ")[1]
        : headerToken.split(" ")[0];

    if (BlacklistToken.has(token)) throw new Error("Token is blacklisted");
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
      if (error) throw new Error("Token is not valid");
      req.user = { token, decoded };
    });

    return next();
  } catch (error) {
    res.status(500).send(error.message || error);
  }
};
