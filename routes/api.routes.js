import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";
import { getTopPlaces } from "../controllers/query.controllers.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/query').get(getTopPlaces);

export default router;