module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        addressDelivery: {
            type: Sequelize.TEXT,
        },
        deliveryAt:{
            type: Sequelize.DATEONLY,
        },
        isCanceled:{//0 not cancel 2 is pending cancel confirm 1 canceled
            type: Sequelize.TINYINT
        },
        isDone: {// 0 pending confirm 1 done 2 deliverying
            type: Sequelize.TINYINT
        }
        // shipperId: {
        //     type: Sequelize.INTEGER,
        // }
    }
    );
    return Order;
}