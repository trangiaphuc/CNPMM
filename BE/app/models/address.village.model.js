module.exports = (sequelize, Sequelize) => {
    const Village = sequelize.define("address-villages", {
        village: {
            type: Sequelize.TEXT
        }
    }
    );
    return Village;
}