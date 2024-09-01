import express from "express";
import { json } from "body-parser";
import { logger, morgan, errorHandler } from "@interface/middleware";

import { userRoutes } from "@interface/routes/userRoutes";

const app = express();

app.use(json());
app.use(express.json());
app.use(morgan);

// Register routes
app.use("/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
