import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const projectRoot = __dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(projectRoot, "public"),
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "three",
    ],
    alias: {
      "@": projectRoot,
      react: path.resolve(projectRoot, "node_modules/react"),
      "react-dom": path.resolve(projectRoot, "node_modules/react-dom"),
      "react/jsx-runtime": path.resolve(projectRoot, "node_modules/react/jsx-runtime.js"),
      "react/jsx-dev-runtime": path.resolve(projectRoot, "node_modules/react/jsx-dev-runtime.js"),
      three: path.resolve(projectRoot, "node_modules/three"),
      "next/image": path.resolve(projectRoot, "./src/shims/next-image.tsx"),
      "next/link": path.resolve(projectRoot, "./src/shims/next-link.tsx"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "three",
      "next-themes",
      "framer-motion",
      "@heroui/react",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("node_modules/@react-three")) {
            return "three-vendor"
          }
          if (id.includes("node_modules/firebase")) {
            return "firebase"
          }
          if (id.includes("node_modules/gsap")) {
            return "gsap"
          }
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion"
          }
          if (id.includes("node_modules/lenis")) {
            return "lenis"
          }
          if (id.includes("node_modules/@heroui") || id.includes("node_modules/@react-aria")) {
            return "ui-vendor"
          }
        },
      },
    },
  },
})
