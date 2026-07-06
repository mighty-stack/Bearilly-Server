import {Router} from 'express';
import auth from "../../middleware/auth.middleware.js";
import access from "../../middleware/access.middleware.js";
import progressController from "./progress.controller.js";

const router = Router();

router.post("/start", auth, access("user"), progressController.startLesson);
router.post("/complete", auth, access("user"), progressController.completeLesson);

export default router;