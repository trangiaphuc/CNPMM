module.exports = (sequelize, Sequelize) => {
    const Delivery = sequelize.define("deliveryMethods", {
        deliveryMethod:{
            type: Sequelize.STRING
        },
        fee: {
            type: Sequelize.FLOAT
        }
    }
    );
    return Delivery;   
}