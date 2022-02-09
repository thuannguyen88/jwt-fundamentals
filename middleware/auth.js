import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

// set up authorisation middleware so we can use for our routes

const authenticationMiddleware = async (req, res, next) => {
  //   console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  console.log(decoded);
    // take the values id and username from decoded
    const { id, username } = decoded;
    // set the user property to the object id and username values
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorised to access this route");
  }
  //   next();
};

export default authenticationMiddleware;
