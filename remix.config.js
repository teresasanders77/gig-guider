// remix.config.js
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  plugins: [require("remix-tailwind")],
};
