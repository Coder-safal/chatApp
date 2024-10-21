import Router from "express";

const router = Router();
import {
    sendMessage,
    getAllMessage
} from "../controllers/message.controllers.js";
import { verifyJWT } from "../controllers/user.controllers.js";



router.route("/message/send/:reciverId").post(verifyJWT, sendMessage);
router.route("/message/getAllMessage/:reciverId").get(verifyJWT,getAllMessage);

export default router;

