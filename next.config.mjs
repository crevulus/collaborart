/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public", // Output directory for service worker
  register: true, // Automatically register service worker
  skipWaiting: true, // Activate service worker immediately
  scope: "/app",
  sw: "service-worker.js",
  disable: process.env.NODE_ENV === "development", // Disable in development mode
});

const config = withPWAConfig({
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
});

export default config;
