import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      tanstackStart({ server: { entry: "server" } }),
      nitro(),
      viteReact(),
      tailwindcss(),
      tsconfigPaths(),
    ],
    optimizeDeps: { include: ["pdfjs-dist", "pdf-lib"] },
  };
});
