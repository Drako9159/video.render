import multer from "multer";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const PATH_STORAGE = path.join(process.cwd(), `./videos/`);

function validateFolder() {
  try {
    if (!existsSync(PATH_STORAGE)) {
      return mkdirSync(PATH_STORAGE);
    }
    return;
  } catch (e) {
    throw new Error("NOT_SUCH_FOLDER");
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    validateFolder();
    cb(null, PATH_STORAGE);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const copy = `${file.originalname.split(".")[0]}${Date.now()}.${ext}`;
    cb(null, copy);
  },
  onError: (err, next) => {
    console.log("error", err);
    next(err);
  },
});

const uploadMiddleware = multer({ storage });
export default uploadMiddleware;
