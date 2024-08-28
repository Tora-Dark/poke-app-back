import { Router } from "express";
import { RegionController } from "@interface/controllers/RegionController";
import { RegionService } from "@infrastructure/services/RegionService";

const router = Router();
const service = new RegionService();
const controller = new RegionController(service);

router.get("/", (req, res) => controller.findAll(req, res));
router.get("/:id", (req, res) => controller.find(req, res));
router.post("/", (req, res) => controller.create(req, res));

export { router as regionRoutes };
