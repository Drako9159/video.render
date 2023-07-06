import ffmpeg from "fluent-ffmpeg";

import path from "node:path";
import { existsSync, mkdirSync, readdirSync } from "node:fs";

const PATH_STORAGE = path.join(process.cwd(), `./videos`);
const PATH_RENDER = path.join(process.cwd(), "./videos_render");

function validateFolder() {
  if (!existsSync(PATH_RENDER)) return mkdirSync(PATH_RENDER);
  return;
}

function readVideos() {
  const videos = readdirSync(PATH_STORAGE);
  return videos[0];
}

const outputOptions = [
  "-c:v libx264", // Codec de video H.264
  "-crf 23", // Factor de calidad (valores más bajos dan mayor calidad)
  "-preset veryfast", // Velocidad de codificación (valores más bajos dan mayor calidad)
  "-c:a aac", // Codec de audio AAC
  "-b:a 128k", // Tasa de bits de audio
  "-movflags faststart", // Mueve los metadatos al inicio del archivo para una carga progresiva
];

export function renderRun() {
  readVideos();
  validateFolder();
  ffmpeg(`${PATH_STORAGE}/${readVideos()}`)
    .outputOptions(outputOptions)
    // .outputFormat("mp4")
    // .size("640x480")
    .output(`${PATH_RENDER}/${readVideos()}`)
    .on("end", () => {
      console.log("Conversion completed");
    })
    .on("error", (err) => {
      console.error("Error in conversion", err);
    })
    .run();
}
