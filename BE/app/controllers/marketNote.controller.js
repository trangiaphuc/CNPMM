const db = require('../models');
const MarketNote = db.marketNote;
const logger = require('../winston/winston');

exports.addToNote = (req, res) =>{
    const userId  = req.params.userId;
    const listMarketNoteItems = req.body.listMarketNoteItems;
    var flag = true;
    listMarketNoteItems.forEach(marketNoteItem => {
        MarketNote.create({
            logging: (sql, queryObject) =>{
                logger.info(sql, queryObject);
            },
            userId: userId,
            marketNoteText: marketNoteItem.marketNoteText,
            remindDate: marketNoteItem.remindDate,
            isDone: marketNoteItem.isDone,
            isDeleted: false,
        })
        .catch(err=>{
            if(err)
            {
                flag = false;
            }
        })
    })
    if(flag)
    { 
        res.status(201).send({message: "Success!"});
    }
    else{
        res.status(500).send({message: "Fail!"});
    }
}

exports.getAllMarketNotes = (req, res)=>{
    const userId = req.params.userId;
    MarketNote.findAll({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        where:{
            userId: userId,
            isDeleted: false,
        }
    })
    .then(marketNotes =>{
        if(marketNotes){
            res.status(200).send({marketNotes: marketNotes});
        }
        else{
            res.status(200).send({marketNotes: "Empty!"});
        }
    })
    .catch(err=>{
        res.status(500).send({message: err.message})
    })
}

exports.deleteMarketNote = (req, res) =>{
    const userId = req.params.userId;
    const marketNoteId = req.params.marketNoteId
    MarketNote.findOne({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        where: {
            userId: userId,
            id: marketNoteId,
            isDeleted: false,
        }
    })
    .then(marketNote =>{
        if(marketNote)
        {
            marketNote.update({
                logging: (sql, queryObject) =>{
                    logger.info(sql, queryObject);
                },
                isDeleted: true,
            })
            .then(updatedItem=>{
                if(updatedItem){
                    res.status(200).send({message: 'Success!'});
                }
                else{
                    res.status(500).send({message: 'Fail!'});
                }
            })
            .catch(err =>{
                res.status(500).send({message: err.message});
            })
        }
        else{
            res.status(404).send({message: 'Not Found!'});
        }
    })
}

exports.editNote = (req, res) =>{
    
    const userId = req.params.userId;
    MarketNote.findOne({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        where: {
            userId: userId, 
            isDeleted: false,
        }
    })
    .then(marketNote =>{
        if(marketNote){
            marketNote.update({
                logging: (sql, queryObject) =>{
                    logger.info(sql, queryObject);
                },
                marketNoteText: req.body.marketNoteText,
                remindDate: req.body.remindDate,
                isDone: req.body.isDone,
            })
            .then(updatedItem =>{
                if(updatedItem){
                    res.status(200).send({message: 'Success!'});
                }
                else{
                    res.status(500).send({message: 'Fail!'})
                }
            })
        }
        else{
            res.status(404).send({message: 'Not Found!'})
        }
    })
    .catch(err=>{
        res.status(500).send({message: err.message})
    })
}



// reqUpdate = [1,3,4,5]
// Db = [1,2,3,4]

// reqUpdate.include(Db) = [1,3,4] => {Update}
// !reqUpdate.include(Db) = [5] => create
// !Db.include(reqUpdate) = [4] => Delete
