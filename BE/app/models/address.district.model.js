module.exports = (sequelize, Sequelize) => {
    const District = sequelize.define("address-districts", {
        district: {
            type: Sequelize.TEXT
        }
    }
    );
    return District;
}