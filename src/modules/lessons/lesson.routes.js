import {Router} from 'express';
import auth from '../../middleware/auth.middleware.js';
import access from "../../middleware/access.middleware.js"
import lessonController from "./lesson.controller.js";

const router = Router();

router.get("/", auth, access("user"), lessonController.getAllLessons);
router.get("/:id", auth, access("user"), lessonController.getLesson);

export default router