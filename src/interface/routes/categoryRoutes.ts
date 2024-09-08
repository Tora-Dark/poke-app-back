import { Router } from "express";
import { CategoryController } from "@interface/controllers/CategoryController";
import { CategoryService } from "@infrastructure/services/CategoryService";
import { asyncHandler } from "@interface/middleware";
import { AsyncRequestHandler } from "src/types/asyncRequestHandler";

const router = Router();
const service = new CategoryService();
const controller = new CategoryController(service);

router.get(
  "/",
  asyncHandler(controller.findAll.bind(controller) as AsyncRequestHandler)
);
router.get(
  "/:id",
  asyncHandler(controller.find.bind(controller) as AsyncRequestHandler)
);
router.post(
  "/",
  asyncHandler(controller.create.bind(controller) as AsyncRequestHandler)
);
router.put(
  "/:id",
  asyncHandler(controller.update.bind(controller) as AsyncRequestHandler)
);
router.delete(
    "/:id",
    asyncHandler(controller.delete.bind(controller) as AsyncRequestHandler)
  );
export { router as categoryRoutes };
