import {Router} from 'express';
import auth from "../../middleware/auth.middleware.js";
import access from "../../middleware/access.middleware.js";
import quizzesController from "./quizzes.controller.js";

const router = Router();

router.post("/", auth, access("admin"), quizzesController.createQuiz);
router.get("/:id", auth, access("user"), quizzesController.getQuiz);
router.post("/submit", auth, access("user"), quizzesController.submitQuiz);

export default router;