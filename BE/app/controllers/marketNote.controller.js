const db = require('../models');
const MarketNote = db.marketNote;
const MarketNoteDetail = db.marketNoteDetail;
const logger = require('../winston/winston');

exports.addToNote = (req, res) =>{
    const userId = req.params.userId;
    const listMarketNoteItems = req.body.listMarketNoteItems;
    MarketNote.create({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        userId: userId,
        marketNoteName: req.body.marketNoteName,
        remindDate: req.body.remindDate,
        isDone: false,
        isDelete: false,
    })
    .then(marketNote=>{
        // res.status(200).send({message: 'Success!'})
        // if(marketNote){
            var flag = true;
            listMarketNoteItems.forEach(marketNoteItem=>{
                MarketNoteDetail.create({
                    logging: (sql, queryObject) =>{
                        logger.info(sql, queryObject);
                    },
                    marketNoteId: marketNote.id,
                    marketNoteDetailProduct: marketNoteItem.marketNoteDetailProduct,
                    marketNoteDetailQuantity: marketNoteItem.marketNoteDetailQuantity,
                    isDone: marketNoteItem.isDone,
                })
                .catch(err =>{
                    if(err){
                        flag = false;
                        console.log(err.message)
                    }
                })
            });

            if(flag == true){
                res.status(201).send({message: "Success!"});
            }
            else{
                res.status(500).send({message: "Fail!"});
            }
        // }
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}

exports.getAllMarketNotes = (req, res)=>{
    const userId = req.params.userId;
    MarketNote.findAll({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        where:{
            userId: userId,
            isDelete: false,
        },
        include: [
            {
                model: MarketNoteDetail,
                attributes: ['id', 'marketNoteDetailProduct', 'marketNoteDetailQuantity', 'marketNoteId', 'isDone'],
            }
        ]
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
            isDelete: false,
        }
    })
    .then(marketNote =>{
        if(marketNote)
        {
            marketNote.update({
                logging: (sql, queryObject) =>{
                    logger.info(sql, queryObject);
                },
                isDelete: true
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
    const marketNoteId = req.params.marketNoteId;
    
    MarketNote.findAll({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        where: {
            userId: userId,
            id: marketNoteId
        },
        include: [
            {
                model: MarketNoteDetail,
                attributes: ['id', 'marketNoteDetailProduct', 'marketNoteDetailQuantity', 'marketNoteId', 'isDone'],
            }
        ]
    })
    .then(marketNote =>{
        if(marketNote){
            var listMarketNoteItems = marketNote.marketNoteName;
            var listUpdateMarketNoteItemsId = [];
            console.log()
            res.send({"data": "listMarketNoteItems", message: marketNote});

            listMarketNoteItems.forEach(marketNoteItem => {
                listUpdateMarketNoteItemsId.push(marketNoteItem.id);
            });

            console.log({"HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEE": listUpdateMarketNoteItemsId})

            const listUpdateMarketNoteItems = req.body.listUpdateMarketNoteItems;
            var flag = true;
            listUpdateMarketNoteItems.forEach(marketNoteItem => {
                MarketNoteDetail.findOne({
                    logging: (sql, queryObject) =>{
                        logger.info(sql, queryObject);
                    },
                    where: {id: marketNoteItem.id}
                })
                .then(foundItem => 
                {    
                    if(listUpdateMarketNoteItemsId.includes(foundItem.id)){
                        //neu co ton tai trong danh sach moi
                        //update
                        foundItem.update({
                            logging: (sql, queryObject) =>{
                                logger.info(sql, queryObject);
                            },
                            marketNoteDetailProduct: marketNoteItem.marketNoteDetailProduct,
                            marketNoteDetailQuantity: marketNoteItem.marketNoteDetailQuantity,
                            isDone: marketNoteItem.isDone,
                            updatedAt: new Date(),
                        })
                        .catch(err => {
                            if(err){
                                flag = false;
                            }
                        })
                    }
                    else{
                        //neu khong ton tai trong danh sach moi
                        //delete
                        foundItem.destroy({
                            logging: (sql, queryObject) =>{
                                logger.info(sql, queryObject);
                            },
                        })
                        .catch(err =>{
                            if(err){
                                flag = false;
                            }
                        })
                    }
                })
                .catch(err =>{
                    res.status(500).send({message: 'Fail!'});
                })
            })

            if(flag== true){
                res.status(200).send({message: 'Success!'})
            }
            else{
                res.status(500).send({message: 'Fail!'});
            }

        }
        else{
            res.status(404).send({message: "Not Found!"});
        }
    })
    .catch(err =>{
        res.status(500).send({message: err.message});
    })

}