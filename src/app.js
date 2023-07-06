import express from "express";
import path from "node:path";
import cors from "cors";
import {} from "dotenv/config";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(process.cwd(), "./videos_render")));

import storageRoutes from "./routes/video.routes.js";
app.use("/api", storageRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({message: "NOT_FOUND"});
});

export default app;
