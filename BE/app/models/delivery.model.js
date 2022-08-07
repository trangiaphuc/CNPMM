module.exports = (sequelize, Sequelize) => {
    const Delivery = sequelize.define("deliveryMethods", {
        deliveryMethod:{
            type: Sequelize.TEXT
        },
        fee: {
            type: Sequelize.FLOAT
        }
    }
    );
    return Delivery;   
}