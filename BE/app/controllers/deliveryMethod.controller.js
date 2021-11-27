const db = require('../models');
const Delivery = db.deliveryStatusType;
const logger = require('../winston/winston');

exports.getAllDeliveryMethods = (req, res) => {
    Delivery.findAll({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
    })
    .then(deliveries =>{
        res.status(200).send({deliveries: deliveries});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
}

exports.addNewDeliveryMethod = (req, res) =>{
    Delivery.create({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        deliveryStatusType: req.body.deliveryStatusType
    })
    .then(delivery =>{
        res.status(200).send({delivery: delivery});
    })
    .catch(err =>{
        res.status(500).send({message: err.message});
    })
}
