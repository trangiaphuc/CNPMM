module.exports = (sequelize, Sequelize) => {
    const FoodCookStep =  sequelize.define("foodCookSteps", {
        stepNumber: {
            type: Sequelize.INTEGER,
        },
        stepDescription: {
            type: Sequelize.STRING
        }
    });
    return FoodCookStep;
}