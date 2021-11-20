module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("foods", {
        foodImage:{
            type: Sequelize.STRING,
        },
        foodName:{
            type: Sequelize.STRING,
        },
        foodDescription:{
            type: Sequelize.STRING,
        },
        foodCalories:{
            type: Sequelize.FLOAT,
        }
    });

    return Food;
}