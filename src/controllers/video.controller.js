import { rmSync, existsSync } from "node:fs";
import path from "node:path";
import handleError from "../utils/handleError.js";
import { renderRun } from "../libs/renderFFMPEG.js";
import { reader } from "../libs/readerVideos.js";

const PATH_STORAGE = path.join(process.cwd(), `./videos/`);
const PATH_RENDER = path.join(process.cwd(), `./videos_render/`);

export function deleteAllVideos(req, res) {
  try {
    if (existsSync(PATH_STORAGE)) rmSync(PATH_STORAGE, { recursive: true });
    if (existsSync(PATH_RENDER)) rmSync(PATH_RENDER, { recursive: true });
    return res.status(204).send({ message: "ok" });
  } catch (error) {
    return handleError(500, "NOT_SUCH_FILE");
  }
}

export function render(req, res) {
  renderRun();
  return res.send({ message: "RENDER_IS_RUNNING" });
}

export function getVideos(req, res) {
  const videos = reader();
  return res.send({ content: videos });
}
