module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define("orderDetails", {
        quantity: {
            type: Sequelize.INTEGER,
        }
    }
    );
    return OrderDetail;
}