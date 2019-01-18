const ReceivingMode = require('../api/marketplace/order/receiving-mode.model');

console.log((`♂ Mars DB: Planting seeds for the ReceivingMode model...`).yellow);
ReceivingMode.remove({}, async () => {
    await ReceivingMode.create({ value: "CHECKOUT" });
    await ReceivingMode.create({ value: "DELIVERY" });
    console.log(`♂ Mars DB: ReceivingMode seeds planted!`.green);
});