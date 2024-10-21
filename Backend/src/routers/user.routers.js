import Router from "express";
const router = Router();

import { signUp, logIn, logOut, verifyJWT, getAlluser } from "../controllers/user.controllers.js";

router.route("/user/signup").post(signUp);
router.route("/user/login").post(logIn);
router.route("/user/logout").get(verifyJWT, logOut);
router.route("/user/getAlluser").get(verifyJWT, getAlluser);

export default router;