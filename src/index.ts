import express from "express";
import { json } from "body-parser";
import { errorHandler } from "@interface/middleware/errorHandler";
import { logger } from "@interface/middleware/logger";

import { userRoutes } from "@interface/routes/userRoutes";
import { regionRoutes } from "@interface/routes/regionRoutes";
const app = express();
app.use(json());
app.use(express.json());
app.use(errorHandler);

// Register routes
app.use("/users", userRoutes);
app.use("/regions", regionRoutes);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
