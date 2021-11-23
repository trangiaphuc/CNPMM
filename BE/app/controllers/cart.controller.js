const db = require('../models');
const Cart = db.cart;
const CartDetail = db.cartDetail;
const Product = db.product;
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
            logger.info(`Request: status: ${res.status(200)}  data ${data}`);
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
                        logger.info(`Request status: ${res.status(200)}  data ${data}`);
                        res.status(201).send({cart: data});
                    }
                })
                .catch(err => {
                    logger.error(`Request status: ${res.status(500)}  error ${err}`);
                    res.status(500).send({
                        message:
                        err.message
                    });
                });
            })
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({
            message:
            err.message
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
                        logger.error(`Request status: ${res.status(500)}  error ${err}`);
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
                logger.error(`Request status: ${res.status(500)}  error ${err}`);
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
                    logger.error(`Request status: ${res.status(500)}  error ${err}`);
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
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({
            message:
            err.message
        });
    });
}

exports.editCartItem = (req, res) => {
    const userId = req.params.userId;
    const cartDetailId = req.params.cartItemId;

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
                if(cartDetail)
                {                
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
                            .then(() =>{
                                res.status(200).send({message: "Sucess!"});
                            })
                            .catch(err => {
                                logger.error(`Request status: ${res.status(500)}  error ${err}`);
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
                    .catch(err => {
                        logger.error(`Request status: ${res.status(500)}  error ${err}`);
                        res.status(500).send({
                            message:
                            err.message
                        });
                    });
                }
                else{
                    res.status(404).send({message: "Cart Item not found"})
                }
            })
            .catch(err => {
                logger.error(`Request status: ${res.status(500)}  error ${err}`);
                res.status(500).send({
                    message:
                    err.message
                });
            });
        }
        else{
            logger.error(`${new Date()}: Request: status: ${res.status(404)}  error User not found`);
            res.status(404).send({message: "User not found!"})
        }
    })

}

exports.deleteCartItem= (req, res) => {
    const userId = req.params.userId;
    const cartItemId = req.params.cartItemId;

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
                    where: {id: cartItemId}},
            )
            .then(cartItem=>{
            //update gio hang
                if(cartItem)    
                {
                    CartDetail.destroy({
                        logging: (sql, queryObject) =>{
                            logger.info(sql, queryObject);
                        },
                        where: {id: cartItem.id},
                    })
                    .then(() =>{
                        //neu update thanh 0 item
                        //delete cart item
                        res.status(200).send({message: "Success!"});
                    })
                    .catch(err => {
                        logger.error(`Request status: ${res.status(500)}  error ${err}`);
                        res.status(500).send({
                            message:
                            err.message
                        });
                    });
                }
                else{
                    res.status(404).send({message: "CartItem not found!"})
                }
            })
            .catch(err => {
                logger.error(`Request status: ${res.status(500)}  error ${err}`);
                res.status(500).send({
                    message:
                    err.message
                });
            });
        }
        else{
            logger.error(`Request status: ${res.status(404)}  error User not found`);
            res.status(404).send({message: "User not found!"})
        }
    })
}

