module.exports = (sequelize, Sequelize) => {
    const CartDetail = sequelize.define("cartDetails", {
        quantity : {
            type: Sequelize.INTEGER
            }
        }
    );
    return CartDetail;
}