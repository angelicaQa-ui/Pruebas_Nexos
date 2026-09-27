const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  
  // Genera el reporte HTML automáticamente
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  use: {
    // Toma captura de pantalla si el test falla
    screenshot: 'only-on-failure',
    
    // Graba video solo en caso de fallos
    video: 'retain-on-failure',
  },
});