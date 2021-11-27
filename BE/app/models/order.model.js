module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        addressDelivery: {
            type: Sequelize.STRING,
        },
        deliveryAt:{
            type: Sequelize.DATEONLY,
        },
        orderStatus:{
            type: Sequelize.BOOLEAN,
        },
        // shipperId: {
        //     type: Sequelize.INTEGER,
        // }
    }
    );
    return Order;
}