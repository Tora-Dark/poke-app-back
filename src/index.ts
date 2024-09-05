import express from "express";
import { json } from "body-parser";
import { logger, morgan, errorHandler } from "@interface/middleware";

import { userRoutes } from "@interface/routes/userRoutes";
import { categoryRoutes } from "@interface/routes/categoryRoutes";
import { productRoutes } from "@interface/routes/productRoutes";
import { tagRoutes } from "@interface/routes/tagRoutes";

const app = express();

app.use(json());
app.use(express.json());
app.use(morgan);

// Register routes
app.use("/users", userRoutes);


app.use("/categories",categoryRoutes)
app.use("/products",productRoutes)
app.use("/tags",tagRoutes)

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
