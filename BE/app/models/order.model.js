module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        addressDelivery: {
            type: Sequelize.STRING,
        },
        deliveryAt:{
            type: Sequelize.DATEONLY,
        },
        isActive:{
            type: Sequelize.BOOLEAN,
        },
        userPay: 
        {
            type: Sequelize.FLOAT
        }
    }
    );
    return Order;
}