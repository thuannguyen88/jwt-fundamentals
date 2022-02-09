import CustomAPIError from "../errors/custom-error.js";
import jwt from "jsonwebtoken";
// check username and password in post(login) request
// if it exists create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body;

  // check validation through database i.e. mongo
  // set up another validation layer with joi package
  // check in the controller
// 400 error, is a bad request error
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  // dummy database, this is a demo, normally provided by database
  const id = new Date().getDate();

  //payload, secretkey & options
  //keep payload small, better user experience
  //this is just for testing, in production for your secretkey, set long, complex and unguessable string value!
  //options, setting expiration in 30 days
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //   console.log(username, password);

  res.status(200).json({ msg: "user created", token });
  //   res.send("Dummy Register and Login Route");
};

const dashboard = async (req, res) => {
  // assign authorisation header to variable
  //   const authHeader = req.headers.authorization;
  //if the auth header doesnt exist or string doesnt start with bearer we throw an error
  // 401 is the unauthorized error
  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     throw new CustomAPIError("No token provided", 401);
  //   }
  //split the string and store the token value
  //   const token = authHeader.split(" ")[1];
  //   console.log(token);
  //verify the token
  // pass in token and secretkey
  // if the token is expired we can handle that in the catch block
  // decoded gets you back data object, in this case; id, username, iat (issued at) and exp (expiration) which comes from our payload that we passed in jwt.sign when we signed the token
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     //  console.log(decoded);

  // getting req.user from our auth middleware, and will pass req.user.username into our response
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);
  //     // get random numbers between 1 and 100
  res.status(200).json({
    message: `Hello ${req.user.username}`,
    secret: `Here is your authorised data, your lucky number is ${luckyNumber}`,
  });
  //   } catch (error) {
  //     throw new CustomAPIError("Not authorised to access route", 401);
  //   }
};

export { login, dashboard };
