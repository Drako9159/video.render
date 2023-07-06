import path from "node:path";
import { existsSync, mkdirSync, readdirSync } from "node:fs";

const PATH_RENDER = path.join(process.cwd(), "./videos_render");

export function reader() {
  const videos = readdirSync(PATH_RENDER);
  return videos;
}
