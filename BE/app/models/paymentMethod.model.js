module.exports = (sequelize, Sequelize) => {
    const PaymentMethod = sequelize.define("paymentMethods", {
        paymentType:{
            type: Sequelize.STRING
        }
    }
    );
    return PaymentMethod;
}