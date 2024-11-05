import { defineConfig } from "vite";
import path from "path";
import injectHTML from "vite-plugin-html-inject";
import createSvgSpritePlugin from "vite-plugin-svg-spriter";

const SRC_PATH = path.resolve(__dirname, "src");
const SVG_FOLDER_PATH = path.resolve(SRC_PATH, "svg-sprite");

export default defineConfig({
   plugins: [injectHTML(), createSvgSpritePlugin({ svgFolder: SVG_FOLDER_PATH })],
});
