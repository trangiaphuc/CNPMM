module.exports = (sequelize, Sequelize) => {
    const FoodMaterial = sequelize.define("foodMaterials", {

        foodMaterialName:{
            type: Sequelize.TEXT
        },
        quantityDescription:{
            type: Sequelize.TEXT
        },
        quantityValue:{
            type: Sequelize.FLOAT
        }
    });

    return FoodMaterial;
}