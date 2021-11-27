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
        res.status(200).send({methods: methods});
    })
    .catch(err => {
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
            res.status(200).send({message: 'Success!'});
        }
        else{
            res.status(500).send({message: 'Fail!'});
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}
