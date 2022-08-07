module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        proName: {
            type : Sequelize.TEXT,
        },
        proDescription: {
            type : Sequelize.TEXT,
        },
        quantityValue: {
            type: Sequelize.FLOAT
        },
        price: {
            type: Sequelize.FLOAT,
        },
        brand: {
            type : Sequelize.TEXT,
        },
        origin: {
            type : Sequelize.TEXT
        },//noi san xuat
        productAt:{
            type : Sequelize.DATEONLY
        },
        expireAt: {
            type : Sequelize.STRING
        },
        manual:{
            type : Sequelize.TEXT
        },
        preserve: {
            type : Sequelize.TEXT
        },
        productImage: {
            type : Sequelize.TEXT
        },
        isSelling: {
            type : Sequelize.BOOLEAN
        }
    }, {
        indexes: [
            {type: 'FULLTEXT', name: 'product_index', fields: ['proName']}
        ]
    });
    return Product;
}