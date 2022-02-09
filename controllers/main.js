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

res.status(200).json({msg:"user created", token})
//   res.send("Dummy Register and Login Route");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  // get random numbers between 1 and 100
  res.status(200).json({
    message: `Hello Placeholder User`,
    secret: `Here is your authorised data, your lucky number is ${luckyNumber}`,
  });
};

export { login, dashboard };
