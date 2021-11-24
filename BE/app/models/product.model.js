module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        proName: {
            type : Sequelize.STRING,
        },
        proDescription: {
            type : Sequelize.STRING,
        },
        quantityValue: {
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
        },
        productImage: {
            type : Sequelize.STRING
        }
    });
    return Product;
}