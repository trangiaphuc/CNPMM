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
        logger.info(`Request status: ${res.status(200)} data ${deliveries}`);
        res.status(200).send({deliveries: deliveries});
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
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
        logger.info(`Request status: ${res.status(200)} data ${delivery}`);
        res.status(200).send({delivery: delivery});
    })
    .catch(err =>{
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}
