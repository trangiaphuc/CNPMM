module.exports = (sequelize, Sequelize) => {
    const ProductCategory = sequelize.define("productCategories", {
        catName: {
             type: Sequelize.TEXT,
        },
        catIcon: {
            type: Sequelize.TEXT
        },
        isShowing: {
            type: Sequelize.BOOLEAN,
        }
    });

    return ProductCategory;
}