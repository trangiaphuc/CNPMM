const db = require('../models');
const Cart = db.cart;
const CartDetail = db.cartDetail;
const Product = db.product;
const logger = require('../winston/winston');
const fs = require('fs');

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
                required: false,
                include: [
                      {
                        model: Product,
                      }
                  ],
                where: {
                    isBuy: false,
                    isDeleted: false,
                }
              }
          ]
    })
    .then(cart => {
        //neu co gio hang ti response ve
        
        if(cart != null){
            var cartDetails = cart.cartDetails;
            cartDetails.forEach(cartDetail => {
                var product = cartDetail.product;
                        
                const image = fs.readFileSync(
                    __basedir + product.productImage
                );
                var base64Image = Buffer.from(image).toString("base64");
                product.productImage = "cart:image/png;base64,"+base64Image;
                }
            )
            res.status(200).send({cart: cart});
        }
        else{
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
                            required: false,
                            include: [
                                   {
                                     model: Product,
                                   }
                             ],
                             where: {
                                 isBuy: false,
                                 isDeleted: false,
                             }
                           }
                       ]
                 })
                 .then(cart => {
                     if(cart != null) {
                         res.status(200).send({cart: cart});
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
        //  if(cart != null)
        // {
        //      if(cart.cartDetails != null)
        //      {     
        //          var cartDetails = cart.cartDetails;
        //              cartDetails.forEach(cartDetail => {
        //                  var product = cartDetail.product;
                        
        //                  const image = fs.readFileSync(
        //                  __basedir + product.productImage
        //                  );
        //                  var base64Image = Buffer.from(image).toString("base64");
        //                  product.productImage = "cart:image/png;base64,"+base64Image;

        //              }
        //          )
                
        //      }
        //      logger.info(`Request: status: ${res.status(200)}  cart ${cart}`);
        //      cart.cartDetails.reverse();
                
        //      res.status(200).send({cart: cart});
        // }
        // else{
        //      //chua co thi tao gio hang moi
        //      Cart.create({
        //          logging: (sql, queryObject) =>{
        //              logger.info(sql, queryObject);
        //          },

        //          userId: userId,
        //          createdAt: new Date(),
        //          updatedAt: new Date(),
        //      })
        //      .then(cart =>{
        //          //tra ve dio hang rong
        //         Cart.findOne({
        //              logging: (sql, queryObject) =>{
        //                  logger.info(sql, queryObject);
        //                },
        //                where: {userId: cart.userId},
        //             //    include:[
        //             //        {
        //             //          model: CartDetail,
        //             //         include: [
        //             //                {
        //             //                  model: Product,
        //             //               }
        //             //          ],
        //             //        where: {
        //             //              isBuy: false,
        //             //              isDeleted: false,
        //             //         }
        //             //        }
        //             //    ]
        //          })
        //          .then(cart => {
        //              if(cart!= null)
        //              {
        //                  //bao la gio hang vua duoc tao
        //                  // logger.info(`Request status: ${res.status(200)}  cart ${cart}`);
        //                 res.status(201).send({cart: cart});
        //              }
        //          })
        //          .catch(err => {
        //         logger.error(`Request status: ${res.status(500)}  error ${err}`);
        //              res.status(500).send({
        //                  message:
        //                  err.message
        //         });
        //         });
        //     })
        // }
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
                        isBuy: false,
                        isDeleted: false,
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
                    isBuy: 0,
                    isDeleted: 0,
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
    // const cartDetailId = req.params.cartItemId;
    const listEditCartItemId  = req.body.listEditCartItemId;

    listEditCartItemId.forEach(cartItem =>
    {   
         //check thong tin gio hang cua khach hang
        Cart.findOne({ 
            logging: (sql, queryObject) =>{
                logger.info(sql, queryObject);
            },
            where: {
                userId: userId
            },
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
                        where: {
                            id: cartItem.id,
                            isDeleted: false,
                        }
                    },
                )
                .then(cartDetail=>{
                //update gio hang
                    if(cartDetail)
                    {                
                        cartDetail.update({
                            logging: (sql, queryObject) =>{
                                logger.info(sql, queryObject);
                            },
                            quantity: cartItem.quantity,
                            isBuy: cartItem.isBuy,
                        })
                        .then(updatedItem =>{
                            //neu update thanh 0 item
                            //delete cart item
                            if(updatedItem.quantity == 0){
                                updatedItem.update({
                                    logging: (sql, queryObject) =>{
                                        logger.info(sql, queryObject);
                                    },
                                    isDeleted: true,
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
                    where: {
                        id: cartItemId,
                        isDeleted: false,
                    }
                },
            )
            .then(cartItem=>{
            //update gio hang
                if(cartItem)    
                {
                    cartItem.update({
                        logging: (sql, queryObject) =>{
                            logger.info(sql, queryObject);
                        },
                        isDeleted: true,
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

exports.payCart = (req, res) => {
    const userId = req.params.userId;
    const listCartPay = req.body.listCartPay;
    Cart.findOne({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
          },
          where: {userId: userId},
    })
    .then(cart=>{
        if(cart){
            var flag = true;
            listCartPay.forEach(cartItem =>{
                CartDetail.findOne({
                    logging: (sql, queryObject) =>{
                        logger.info(sql, queryObject);
                      },
                    where: {
                          id: cartItem.id,
                          isDeleted: false,
                    },
                })
                .then(cartItem=>{
                    cartItem.update({
                        logging: (sql, queryObject) =>{
                            logger.info(sql, queryObject);
                        },
                        isBuy : true,
                    })
                    .catch(err => {
                        if(err){
                            flag = false;
                        }
                    })
                })
                .catch(err => {
                    if(err){
                        flag = false;
                    }
                })
            })

            if(flag){
                logger.info(`Request status: ${res.status(200)} Success!`);
                res.status(200).send({message: 'Success!'});
            }
            else{
                logger.error(`Request status: ${res.status(500)}  error ${err}`);
                res.status(500).send({message: 'Fail!'});
            }
        }
        else{
            logger.error(`Request status: ${res.status(404)}  Not found`);
            res.status(404).send({message:"Not Found!"});
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}
