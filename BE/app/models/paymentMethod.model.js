module.exports = (sequelize, Sequelize) => {
    const PaymentMethod = sequelize.define("paymentMethods", {
        paymentType:{
            type: Sequelize.TEXT
        }
    }
    );
    return PaymentMethod;
}