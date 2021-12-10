const db = require('../models');
const PaymentMethod = db.paymentMethod;
const logger = require('../winston/winston');

exports.getAllPaymentMethods = (req, res) => {
    PaymentMethod.findAll({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        }, 
    })
    .then(methods => {
        logger.info(`Request status: ${res.status(200)} data ${methods}`);
        res.status(200).send({methods: methods});
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}

exports.addNewPaymentMethod = (req, res)=>{
    PaymentMethod.create({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        paymentType: req.body.paymentType,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    .then(method =>{
        if(method){
            logger.info(`Request status: ${res.status(200)} data ${methods}`);
            res.status(200).send({message: 'Success!'});
        }
        else{
            logger.error(`Request status: ${res.status(500)}  error`);
            res.status(500).send({message: 'Fail!'});
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}
