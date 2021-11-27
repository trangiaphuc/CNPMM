module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("foods", {
        foodName:{
            type: Sequelize.STRING,
        },
        foodDescription:{
            type: Sequelize.STRING,
        },
        foodCalories:{
            type: Sequelize.FLOAT,
        },
        foodImage:{
            type: Sequelize.STRING,
        }
    }, {
        indexes: [
            {type: 'FULLTEXT', name: 'food_index', fields: ['foodName']}
        ]
    });

    return Food;
}