module.exports = (sequelize, Sequelize) => {
    const CartDetail = sequelize.define("cartDetails", {
        quantity : {
            type: Sequelize.INTEGER
            },
            isBuy:{
                type: Sequelize.BOOLEAN
            },
            isDelete:{
                type: Sequelize.BOOLEAN
            }
        }
    );
    return CartDetail;
}