import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  plugins: [require("remix-tailwind")],
};
