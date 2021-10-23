module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        proPic :{
            type : Sequelize.STRING,
        },
        proName: {
            type : Sequelize.STRING,
        },
        proDescription: {
            type : Sequelize.STRING,
        },
        quantity: {
            type: Sequelize.FLOAT
        },
        price: {
            type: Sequelize.FLOAT,
        },
        brand: {
            type : Sequelize.STRING,
        },
        origin: {
            type : Sequelize.STRING
        },//noi san xuat
        productAt:{
            type : Sequelize.DATEONLY
        },
        expireAt: {
            type : Sequelize.DATEONLY
        },
        manual:{
            type : Sequelize.STRING
        },
        preserve: {
            type : Sequelize.STRING
        }
    });
    return Product;
}