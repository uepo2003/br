/* eslint-env node */
const frontendPort = process.env.FRONTEND_PORT ?? 5173;

module.exports = async function globalSetup() {
  global.TARGET_PAGE_URL = `http://localhost:${frontendPort}`;
};
