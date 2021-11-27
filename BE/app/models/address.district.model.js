module.exports = (sequelize, Sequelize) => {
    const District = sequelize.define("address-districts", {
        district: {
            type: Sequelize.STRING
        }
    }
    );
    return District;
}