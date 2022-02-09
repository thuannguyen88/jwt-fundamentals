import { CustomAPIError } from "../errors/index.js";
// there are a few other status codes but dont need to worry about them now
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong try again later");
};

export default errorHandlerMiddleware;
