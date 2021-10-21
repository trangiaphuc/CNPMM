module.exports = (sequelize, Sequelize) => {
    const FoodMaterial = sequelize.define("foodMaterials", {

        foodMaterialName:{
            type: Sequelize.STRING
        },
        quantityDescription:{
            type: Sequelize.STRING
        }
    });

    return FoodMaterial;
}