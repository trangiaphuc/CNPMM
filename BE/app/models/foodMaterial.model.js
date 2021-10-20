module.exports = (sequelize, Sequelize) => {
    const FoodMaterial = sequelize.define("foodMaterials", {

        foodMaterialName:{
            type: Sequelize.STRING
        },
        quantity:{
            type: Sequelize.FLOAT
        }
    });

    return FoodMaterial;
}