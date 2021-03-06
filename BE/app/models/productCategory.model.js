module.exports = (sequelize, Sequelize) => {
    const ProductCategory = sequelize.define("productCategories", {
        catName: {
             type: Sequelize.STRING,
        },
        catIcon: {
            type: Sequelize.STRING
        },
        isShowing: {
            type: Sequelize.BOOLEAN,
        }
    });

    return ProductCategory;
}