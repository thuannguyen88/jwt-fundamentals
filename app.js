import "dotenv/config";
import express from "express";
import "express-async-errors";

const app = express();

import mainRouter from "./routes/routes.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleWare from "./middleware/error-handler.js";

//middleware
app.use(express.static("./public"));
app.use(express.json());

app.use(`/api/v1`, mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on post ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
