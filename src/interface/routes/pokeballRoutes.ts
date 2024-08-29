import { Router } from "express";
import { PokeballController } from "@interface/controllers/PokeballController";
import { PokeballService } from "@infrastructure/services/PokeballService";

const router = Router();
const service = new PokeballService();
const controller = new PokeballController(service);

router.get("/", (req, res) => controller.findAll(req, res));
router.get("/:id", (req, res) => controller.find(req, res));
router.post("/", (req, res) => controller.create(req, res));

export { router as pokeballRoutes };
