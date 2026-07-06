import { Router } from "express";

import authMiddleware from "../../middleware/auth.middleware.js";
import accessMiddleware from "../../middleware/access.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import assessmentController from "./assessment.controller.js";

const router = Router();

/* User Routes */

router.get("/",authMiddleware,accessMiddleware,assessmentController.getAllAssessments);
router.get("/:id",authMiddleware,accessMiddleware,assessmentController.getAssessment);

/* Admin Routes */

router.post("/",authMiddleware,authorize("admin"),assessmentController.createAssessment);
router.put("/:id",authMiddleware,authorize("admin"),assessmentController.updateAssessment);
router.delete("/:id",authMiddleware,authorize("admin"),assessmentController.deleteAssessment);
router.patch("/:id/publish",authMiddleware,authorize("admin"),assessmentController.publishAssessment);
router.patch("/:id/close",authMiddleware,authorize("admin"),assessmentController.closeAssessment);
router.patch("/:id/reopen",authMiddleware,authorize("admin"),assessmentController.reopenAssessment);

export default router;