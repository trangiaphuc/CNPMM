module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("foods", {
        foodName:{
            type: Sequelize.TEXT,
        },
        foodDescription:{
            type: Sequelize.TEXT,
        },
        foodCalories:{
            type: Sequelize.TEXT,
        },
        foodImage:{
            type: Sequelize.TEXT,
        },
        isShowing:{
            type: Sequelize.BOOLEAN,
        }
    }, {
        indexes: [
            {type: 'FULLTEXT', name: 'food_index', fields: ['foodName']}
        ]
    });

    return Food;
}