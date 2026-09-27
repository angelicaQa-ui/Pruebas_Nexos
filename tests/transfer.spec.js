const { test } = require('@playwright/test');
const { TransferPage } = require('../pages/TransferPage');
const path = require('path');

test.describe('Pruebas de Transferencias Bancarias', () => {
  test('Realizar transferencia exitosa por $150.000 COP', async ({ page }) => {
    const transferPage = new TransferPage(page);

    // Cargar el archivo HTML local
    const filePath = path.resolve(__dirname, '../index.html');
    await page.goto(`file://${filePath}`);

    // 1. Diligenciar y enviar formulario
    await transferPage.realizarTransferencia('Banco Prueba', '987654321', 'SAVINGS', 150000);

    // 2. Verificar datos en la confirmación
    await transferPage.validarTransferenciaExitosa('4589', 150000);
  });
});