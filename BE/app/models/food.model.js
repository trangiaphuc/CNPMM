module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("foods", {
        foodPic:{
            type: Sequelize.STRING,
        },
        foodName:{
            type: Sequelize.STRING,
        },
        foodDesc:{
            type: Sequelize.STRING,
        },
        foodCalories:{
            type: Sequelize.FLOAT,
        }
    });

    return Food;
}