import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import accessMiddleware from "../../middleware/access.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import toolKitController from "./toolkit.controller.js";

const router = Router();

router.get("/",authMiddleware,accessMiddleware,toolKitController.getTools);

router.get("/featured",authMiddleware,accessMiddleware,toolKitController.getFeaturedTools);

router.get("/popular",authMiddleware,accessMiddleware,toolKitController.getPopularTools);

router.get("/:id",authMiddleware,accessMiddleware,toolKitController.getToolById);

router.post("/:id/open",authMiddleware,accessMiddleware,toolKitController.openTool);

/* Admin Routes*/

router.post("/",authMiddleware,authorize("admin"),toolKitController.createTool);

router.put("/:id",authMiddleware,authorize("admin"),toolKitController.updateTool);

router.delete("/:id",authMiddleware,authorize("admin"),toolKitController.deleteTool);

router.get("/analytics/all",authMiddleware,authorize("admin"),toolKitController.getToolAnalytics);

export default router;