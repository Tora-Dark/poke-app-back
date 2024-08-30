import { Router } from "express";
import { UserController } from "@interface/controllers/UserController";
import { UserService } from "@infrastructure/services/UserService";

const router = Router();
const service = new UserService();
const controller = new UserController(service);

router.get("/", (req, res) => controller.findAll(req, res));
router.get("/:id", (req, res) => controller.find(req, res));
router.post("/", (req, res) => controller.create(req, res));

export { router as userRoutes };
