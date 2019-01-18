const PaymentMode = require('../api/marketplace/payment/payment-mode.model');

console.log((`♂ Mars DB: Planting seeds for the PaymentMode model...`).yellow);
PaymentMode.remove({}, async() => {
    await PaymentMode.create({ value: "MASTER_CARD_CREDIT" });
    await PaymentMode.create({ value: "MASTER_CARD_DEBIT" });
    await PaymentMode.create({ value: "VISA_CREDIT" });
    await PaymentMode.create({ value: "VISA_DEBIT" });
    await PaymentMode.create({ value: "ELO_CREDIT" });
    await PaymentMode.create({ value: "ELO_DEBIT" });
    await PaymentMode.create({ value: "BANRICOMPRAS_CREDIT" });
    await PaymentMode.create({ value: "BANRICOMPRAS_DEBIT" });
    console.log(`♂ Mars DB: PaymentMode seeds planted!`.green);
});