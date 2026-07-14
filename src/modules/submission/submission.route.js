import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import submissionController from "./submission.controller.js";
import upload from "../../middleware/upload.middleware.js";
import accessMiddleware from "../../middleware/access.middleware.js";
import validateRequest from "../../middleware/validation.middleware.js";
import { submissionSchema } from "./submission.validation.js";

const router = Router();

router.get("/my", authMiddleware, accessMiddleware, submissionController.getMySubmissions);
router.get("/assessment/:assessmentId", authMiddleware, authorize("admin"), submissionController.getAssessmentSubmissions);
router.get("/:id/receipt", authMiddleware, accessMiddleware, submissionController.submissionReceipt);
router.get("/:id/download", authMiddleware, authorize("admin"), submissionController.downloadSubmission);
router.patch("/:id/review", authMiddleware, authorize("admin"), submissionController.reviewSubmission);
router.patch("/:id/under-review", authMiddleware, authorize("admin"), submissionController.markUnderReview);
router.post(
  "/:assessmentId",
  authMiddleware,
  accessMiddleware,
  upload.single("file"),
  validateRequest(submissionSchema),
  submissionController.submitProject
);
router.get("/:id", authMiddleware, accessMiddleware, submissionController.getSubmission);

export default router;