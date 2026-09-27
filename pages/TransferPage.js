const { expect } = require('@playwright/test');

class TransferPage {
  constructor(page) {
    this.page = page;
    
    // Localizadores de los campos del formulario usando IDs para mayor estabilidad
    this.destinationBank = page.locator('#destinationBank');
    this.destinationAccount = page.locator('#destinationAccount');
    this.accountType = page.locator('#accountType');
    this.amountInput = page.locator('#amount');
    this.submitButton = page.locator('#btnSubmit');
    
    // Elementos de la pantalla de confirmación para validar los resultados
    this.statusSuccess = page.locator('.status-success');
    this.transactionId = page.locator('#transactionId');
    this.confirmedAmount = page.locator('#confirmedAmount');
    this.confirmedSourceAccount = page.locator('#confirmedSourceAccount');
  }
    // Llena los datos del formulario y envía la solicitud de transferencia
  async realizarTransferencia(banco, cuenta, tipoCuenta, monto) {
    await this.destinationBank.selectOption(banco);
    await this.destinationAccount.fill(cuenta);
    await this.accountType.selectOption(tipoCuenta);
    await this.amountInput.fill(monto.toString());
    await this.submitButton.click();
  }
    // Verifica que el comprobante contenga el estado exitoso y los datos correctos
  async validarTransferenciaExitosa(cuentaOrigenEsperada, montoEsperado) {
    await expect(this.statusSuccess).toBeVisible();
    await expect(this.statusSuccess).toHaveText('SUCCESS');
    await expect(this.transactionId).not.toBeEmpty();
    await expect(this.confirmedSourceAccount).toContainText(cuentaOrigenEsperada);
    await expect(this.confirmedAmount).toContainText(montoEsperado.toString());
  }
}

module.exports = { TransferPage };