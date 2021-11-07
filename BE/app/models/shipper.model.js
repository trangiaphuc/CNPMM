module.exports = (sequelize, Sequelize) => {
    const Shipper = sequelize.define("shippers", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        firstname:{
            type: Sequelize.STRING
        },
        lastname:{
            type: Sequelize.STRING
        },
        phone:{
            type: Sequelize.STRING
        },
        birthday:{
            type: Sequelize.DATEONLY
        },
        addressId:{
            type: Sequelize.INTEGER
        }
    }
    );
    return Shipper;
}