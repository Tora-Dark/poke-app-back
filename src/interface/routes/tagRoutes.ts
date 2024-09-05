import { Router } from "express";
import { TagController } from "@interface/controllers/TagController";
import { TagService } from "@infrastructure/services/TagService";
import { asyncHandler } from "@interface/middleware";
import { AsyncRequestHandler } from "src/types/asyncRequestHandler";

const router = Router();
const service = new TagService();
const controller = new TagController(service);

router.get(
  "/",
  asyncHandler(controller.findAll.bind(controller) as AsyncRequestHandler)
);
router.get(
  "/:id",
  asyncHandler(controller.find.bind(controller) as AsyncRequestHandler)
);
router.put(
  "/:id",
  asyncHandler(controller.update.bind(controller) as AsyncRequestHandler)
);
router.post(
  "/",
  asyncHandler(controller.create.bind(controller) as AsyncRequestHandler)
);
router.delete(
    "/:id",
    asyncHandler(controller.delete.bind(controller) as AsyncRequestHandler)
  );
export { router as tagRoutes };
