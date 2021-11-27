const db = require('../models');
const Shipper = db.shipper;
const logger = require('../winston/winston');

exports.getAllShipper = (req, res) => {
    Shipper.findAll({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
    })
    .then(shippers => {
        res.status(200).send({shipper: shippers});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}

