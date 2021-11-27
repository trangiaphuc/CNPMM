module.exports = (sequelize, Sequelize) => {
    const Province = sequelize.define("address-provinces", {
        province: {
            type: Sequelize.STRING
        }
    }
    );
    return Province;
}