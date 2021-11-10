const db = require('../models');
const Cart = db.cart;
const CartDetail = db.cartDetail;
const Product = db.product;
const User = db.user;
const logger = require('../winston/winston');


exports.getCartByUserId = (req, res) => {
    const userId = req.params.userId;

    //tim gio hang cua khach hang xem co hay chua
    Cart.findOne({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
          },
          where: {userId: userId},
          include:[
              {
                model: CartDetail,
                include: [
                      {
                        model: Product,
                      }
                  ]
              }
          ]
    })
    .then(data => {
        //neu co gio hang ti response ve
        if(data){
            logger.info(`${new Date()}: Request: status: ${res.status(200)}  data ${data}`);
            res.status(200).send({cart: data});
        }
        else{
            //chua co thi tao gio hang moi
            Cart.create({
                logging: (sql, queryObject) =>{
                    logger.info(sql, queryObject);
                },

                userId: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .then(cart =>{
                

                //tra ve dio hang rong
                Cart.findOne({
                    logging: (sql, queryObject) =>{
                        logger.info(sql, queryObject);
                      },
                      where: {userId: cart.userId},
                      include:[
                          {
                            model: CartDetail,
                            include: [
                                  {
                                    model: Product,
                                  }
                              ]
                          }
                      ]
                })
                .then(data => {
                    if(data)
                    {
                        //bao la gio hang vua duoc tao
                        logger.info(`${new Date()}: Request: status: ${res.status(200)}  data ${data}`);
                        res.status(201).send({message: "User didn't have cart! Cart Created!", cart: data});
                    }
                })
                .catch(err => {
                    logger.error(`${new Date()}: Request: status: ${res.status(500)}  error ${err}`);
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while retrieving tutorials."
                    });
                });
            })
        }
    })
    .catch(err => {
        logger.error(`${new Date()}: Request: status: ${res.status(500)}  error ${err}`);
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
}


exports.addCartItem = (req, res) => {
    const listCartItems = req.body.listCartItems;
    const userId = req.params.userId;

    //check khach hang da co gio hang hay chua
    Cart.findOne({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
          },
          where: {userId: userId},
    })
    .then(cart => {
        //chua co gio hang
        //tao gio hang neu khach hang chua co gio hang
        if(!cart)
        {
            //tao gio hang
            Cart.create({
                logging: (sql, queryObject) =>{
                    logger.info(sql, queryObject);
                },

                userId: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .then(cart =>{
                //them danh sach san pham vao gio hang
                var flag = true;
                listCartItems.forEach(cartItem =>{

                    CartDetail.create({
                        logging: (sql, queryObject) =>{
                            logger.info(sql, queryObject);
                        },
                        cartId: cart.id,
                        quantity: cartItem.quantity,
                        productId: cartItem.productId,
                        createAt: new Date(),
                        updatedAt: new Date(),
                    })
                    .catch(err => {
                        flag = false;
                        logger.error(`${new Date()}: Request: status: ${res.status(500)}  error ${err}`);
                    });
                });
 
                if(flag == true)
                {
                    res.status(201).send({message: "Success!"})
                }
                else{
                    res.status(500).send({message:"Fail!"})
                }
            })
            .catch(err => {
                logger.error(`${new Date()}: Request: status: ${res.status(500)}  error ${err}`);
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving tutorials."
                });
            });
        }
        else{
            
            var flag = true;

            listCartItems.forEach(cartItem =>{
                    
                CartDetail.create({
                    logging: (sql, queryObject) =>{
                        logger.info(sql, queryObject);
                    },
                    cartId: cart.id,
                    quantity: cartItem.quantity,
                    productId: cartItem.productId,
                    createAt: new Date(),
                    updatedAt: new Date(),
                })
                .catch(err => {
                    flag = false;
                    logger.error(`${new Date()}: Request: status: ${res.status(500)}  error ${err}`);
                    res.status(500).send({
                        message: err.message
                    });
                });
            });
            if(flag == true)
            {
                res.status(201).send({message: "Success!"});
            }
            else{
                res.status(500).send({message:"Fail!"})
            }
        }

    })
    .catch(err => {
        logger.error(`${new Date()}: Request: status: ${res.status(500)}  error ${err}`);
        res.status(500).send({
            message:
            err.message
        });
    });
}

exports.editCartDetail = (req, res) => {
    const userId = req.params.userId;
    const cartDetailId = req.params.cartDetailId;

    // console.log({userId, cartDetailId});

    //check thong tin gio hang cua khach hang
    Cart.findOne({ 
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
          where: {userId: userId},
    })
    .then(cart =>{
        //neu gio hang const
        //thong tin khach hang dung
        if(cart)
        {
            CartDetail.findOne( {
                    logging: (sql, queryObject) =>{
                    logger.info(sql, queryObject);
                },
                    where: {id: cartDetailId}},
            )
            .then(cartDetail=>{
            //update gio hang
                cartDetail.update({
                    logging: (sql, queryObject) =>{
                        logger.info(sql, queryObject);
                    },
                    quantity: req.body.quantity
                })
                .then(updatedItem =>{
                    //neu update thanh 0 item
                    //delete cart item
                    if(updatedItem.quantity == 0){
                        CartDetail.destroy({
                            logging: (sql, queryObject) =>{
                                logger.info(sql, queryObject);
                            },
                            where : {id: updatedItem.id}
                        })
                        .then((desItem) =>{
                            if(desItem ==1)
                            {
                                res.status(200).send({message: "Descrease to zero. Delete Cart Item!"});
                            }
                            else{
                                res.status(200).send({message: "Success!"});
                            }
                        })
                        .catch(err => {
                            logger.error(`${new Date()}: Request: status: ${res.status(500)}  error ${err}`);
                            res.status(500).send({
                                message:
                                err.message
                            });
                        });
                    }
                    else{
                        res.status(200).send({message: "Success!"});
                    }
                })
            })
        }
        else{
            res.status(404).send({message: "User not found!"})
        }
    })

}
