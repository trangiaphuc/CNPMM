const db = require('../models');
const Province = db.province;
const District = db.district;

exports.getProvince = (req, res) =>{
    Province.findAll({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
    })
    .then((provinces) =>{
        res.status(200).send({provinces: provinces});
    })
    .catch((err) =>{
        res.status(500).send({err: err});
    })
}

exports.getDistrict = (req, res)=>{
    const province = req.params.province;
    District.findAll({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
    })
    .then(districts =>{
        res.status(200).send({districts: districts});
    })
    .catch(err => {
        res.status(500).send({err: err});
    })
}