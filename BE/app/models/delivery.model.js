module.exports = (sequelize, Sequelize) => {
    const Delivery = sequelize.define("deliveries", {
        deliveryStatusType:{
            type: Sequelize.STRING
        }
    }
    );
    return Delivery;   
}