const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ge2xgu',
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    chromeWebSecurity: false
  },
});
