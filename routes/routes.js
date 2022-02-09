import express from "express";
import { login, dashboard } from "../controllers/main.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// for public access
router.route("/login").post(login);

// protected route
// authMiddleware goes in first so everytime someone goes to this route they will go through the middleware then onto the dashboard
router.route("/dashboard").get(authMiddleware, dashboard);

export default router;
