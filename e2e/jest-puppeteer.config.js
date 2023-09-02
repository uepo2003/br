/* eslint-env node */
const frontendPort = process.env.FRONTEND_PORT ?? 5173;
const backendPort = process.env.BACKEND_PORT ?? 4444;
module.exports = {
  server: {
    command: `concurrently "BACKEND_PORT=${backendPort} npm run start:server_backend" "FRONTEND_PORT=${frontendPort} npm run start:server_frontend"`,
    port: backendPort,
    launchTimeout: 30000,
  },
  launch: {
    headless: "new",
  },
  browserContext: "incognito",
};
