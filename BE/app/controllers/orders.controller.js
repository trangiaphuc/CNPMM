const { order } = require('../models');
const db = require('../models');
const Order = db.order;
const OrderDetail = db.orderDetail;
const Delivery = db.deliveryStatusType;
const PaymentMethod = db.paymentMethod;
const Shipper = db.shipper;
const Product = db.product;
const logger = require('../winston/winston');


exports.getOrderHistoryByUserId = (req, res) =>{
    const userId = req.params.userId;
    Order.findAll({ 
        logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {userId: userId},
      include: [
        {
            model: Delivery,
            attributes: ['id', 'deliveryMethod', 'fee']
        },
        {
            model: PaymentMethod,
            attributes: ['id', 'paymentType']
        },
        {
            model: OrderDetail,
            attributes: ['id', 'quantity', 'price'],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'proName', 'quantityValue', 'quantityId']
                }
            ]
        }
      ]
    })
    .then(orders => {
        if(orders){
            orders.forEach(order =>{
                var orderDetails = order.orderDetails;
                var totalPrice = 0;
                orderDetails.forEach(orderDetail => {
                    var unitPrice = orderDetail.price * orderDetail.quantity;
                    totalPrice = totalPrice + unitPrice;
                });
                totalPrice = totalPrice + order.deliveryMethod.fee;
                order.setDataValue('totalPrice', totalPrice);
            });
            orders.reverse();
            logger.info(`Request status: ${res.status(200)} data ${orders}`);
            res.status(200).send({orders: orders});
        }
        else{
            logger.info(`Request status: ${res.status(200)} data Empty!`);
            res.status(200).send('Empty!');
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}

exports.getOrderDetailByUserId = (req, res) =>{
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    Order.findOne({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        where:{userId: userId, id: orderId},
        include: [
            {
                model: Delivery,
                attributes: ['id', 'deliveryMethod', 'fee']
            },
            {
                model: PaymentMethod,
                attributes: ['id', 'paymentType']
            },
            {
                model: OrderDetail,
                attributes: ['id', 'quantity', 'price'],
                include: [
                    {
                        model: Product,
                        attributes: ['id', 'proName', 'quantityValue', 'quantityId']
                    }
                ]
            }
        ]
    })
    .then(order => {
        if(order){
            orderDetails = order.orderDetails;
            var totalPrice = 0;
            orderDetails.forEach(orderDetail => {
                var unitPrice = orderDetail.price * orderDetail.quantity;
                totalPrice = totalPrice + unitPrice;
            });
            totalPrice = totalPrice + order.deliveryMethod.fee;
            order.setDataValue('totalPrice', totalPrice);
            logger.info(`Request status: ${res.status(200)} data ${order}`);
            res.status(200).send({order: order});
        }
        else{
            logger.error(`Request status: ${res.status(404)}  Not found`);
            res.status(404).send({message: 'Not Found!'});
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}

exports.addNewOrder = (req, res) => {
    const userId = req.params.userId;
    Order.create({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        addressDelivery: req.body.addressDelivery,
        deliveryAt: new Date(req.body.deliveryAt),
        isCanceled: 0,
        isDone: 0,
        userId: userId, 
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveryMethodId: req.body.deliveryMethodId,
        shipperId: null,
        paymentMethodId: req.body.paymentMethodId
    })
    .then(order =>{
        if(order)
        {
            orderDetails = req.body.orderDetails;
            var flag = true;
            orderDetails.forEach( orderDetail => {
                OrderDetail.create({
                    logging: (sql, queryObject) =>{
                        logger.info(sql, queryObject);
                    },
                    quantity: orderDetail.quantity,
                    price: orderDetail.price,
                    orderId: order.id,
                    productId: orderDetail.productId,
                    createdAt: new Date(),
                    updatedAt: new Date(),  
                })
                .catch(err => {
                    if(err){
                        flag = false;
                    }
                });
                if(flag){
                    logger.info(`Request status: ${res.status(200)} Success!`);
                    res.status(200).send({message: 'Success!'});
                }
                else{
                    logger.error(`Request status: ${res.status(500)}  error`);
                    res.status(500).send({message: 'Fail!'});
                }
            });
        }
        else{
            logger.error(`Request status: ${res.status(500)}  error`);
            res.status(500).send({message:"Fail!"});
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}

exports.updateOrder = (req, res) =>{
    const orderId = req.params.orderId;

    Order.findOne({
        logging: (sql, queryObject) =>{
            logger.info(sql, queryObject);
        },
        where: {id: orderId}
    })
    .then(order => {
        if(order!=null){
            order.update({
                logging: (sql, queryObject) =>{
                    logger.info(sql, queryObject);
                },
                isCanceled: req.body.isCanceled,
                isDone: req.body.isDone,
                deliveryAt: new Date(req.body.deliveryAt),
            })
            .then(updatedItem => {
                res.status(200).send({message: 'Success!'})
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            })
        }
        else{
            res.status(404).send('Not Found!')
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}



exports.getConfirmingOrders = (req, res) =>{
    const userId = req.params.userId;
    Order.findAll({ 
        logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {
          userId: userId,
          isDone: 0
        },
      include: [
        {
            model: Delivery,
            attributes: ['id', 'deliveryMethod', 'fee']
        },
        {
            model: PaymentMethod,
            attributes: ['id', 'paymentType']
        },
        {
            model: OrderDetail,
            attributes: ['id', 'quantity', 'price'],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'proName', 'quantityValue', 'quantityId']
                }
            ]
        }
      ]
    })
    .then(orders => {
        if(orders){
            orders.forEach(order =>{
                var orderDetails = order.orderDetails;
                var totalPrice = 0;
                orderDetails.forEach(orderDetail => {
                    var unitPrice = orderDetail.price * orderDetail.quantity;
                    totalPrice = totalPrice + unitPrice;
                });
                totalPrice = totalPrice + order.deliveryMethod.fee;
                order.setDataValue('totalPrice', totalPrice);
            });
            orders.reverse();
            logger.info(`Request status: ${res.status(200)} data ${orders}`);
            res.status(200).send({orders: orders});
        }
        else{
            logger.info(`Request status: ${res.status(200)} data Empty!`);
            res.status(200).send('Empty!');
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}


exports.getCancelledOrders = (req, res) =>{
    const userId = req.params.userId;
    Order.findAll({ 
        logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {
          userId: userId,
          isCanceled: 1
        },
      include: [
        {
            model: Delivery,
            attributes: ['id', 'deliveryMethod', 'fee']
        },
        {
            model: PaymentMethod,
            attributes: ['id', 'paymentType']
        },
        {
            model: OrderDetail,
            attributes: ['id', 'quantity', 'price'],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'proName', 'quantityValue', 'quantityId']
                }
            ]
        }
      ]
    })
    .then(orders => {
        if(orders){
            orders.forEach(order =>{
                var orderDetails = order.orderDetails;
                var totalPrice = 0;
                orderDetails.forEach(orderDetail => {
                    var unitPrice = orderDetail.price * orderDetail.quantity;
                    totalPrice = totalPrice + unitPrice;
                });
                totalPrice = totalPrice + order.deliveryMethod.fee;
                order.setDataValue('totalPrice', totalPrice);
            });
            orders.reverse();
            logger.info(`Request status: ${res.status(200)} data ${orders}`);
            res.status(200).send({orders: orders});
        }
        else{
            logger.info(`Request status: ${res.status(200)} data Empty!`);
            res.status(200).send('Empty!');
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}


exports.getDeliveryingOrders = (req, res) =>{
    const userId = req.params.userId;
    Order.findAll({ 
        logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {
          userId: userId,
          isDone: 2
        },
      include: [
        {
            model: Delivery,
            attributes: ['id', 'deliveryMethod', 'fee']
        },
        {
            model: PaymentMethod,
            attributes: ['id', 'paymentType']
        },
        {
            model: OrderDetail,
            attributes: ['id', 'quantity', 'price'],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'proName', 'quantityValue', 'quantityId']
                }
            ]
        }
      ]
    })
    .then(orders => {
        if(orders){
            orders.forEach(order =>{
                var orderDetails = order.orderDetails;
                var totalPrice = 0;
                orderDetails.forEach(orderDetail => {
                    var unitPrice = orderDetail.price * orderDetail.quantity;
                    totalPrice = totalPrice + unitPrice;
                });
                totalPrice = totalPrice + order.deliveryMethod.fee;
                order.setDataValue('totalPrice', totalPrice);
            });
            orders.reverse();
            logger.info(`Request status: ${res.status(200)} data ${orders}`);
            res.status(200).send({orders: orders});
        }
        else{
            logger.info(`Request status: ${res.status(200)} data Empty!`);
            res.status(200).send('Empty!');
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}


exports.getDoneOrders = (req, res) =>{
    const userId = req.params.userId;
    Order.findAll({ 
        logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      where: {
          userId: userId,
          isDone: 1
        },
      include: [
        {
            model: Delivery,
            attributes: ['id', 'deliveryMethod', 'fee']
        },
        {
            model: PaymentMethod,
            attributes: ['id', 'paymentType']
        },
        {
            model: OrderDetail,
            attributes: ['id', 'quantity', 'price'],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'proName', 'quantityValue', 'quantityId']
                }
            ]
        }
      ]
    })
    .then(orders => {
        if(orders){
            orders.forEach(order =>{
                var orderDetails = order.orderDetails;
                var totalPrice = 0;
                orderDetails.forEach(orderDetail => {
                    var unitPrice = orderDetail.price * orderDetail.quantity;
                    totalPrice = totalPrice + unitPrice;
                });
                totalPrice = totalPrice + order.deliveryMethod.fee;
                order.setDataValue('totalPrice', totalPrice);
            });
            orders.reverse();
            logger.info(`Request status: ${res.status(200)} data ${orders}`);
            res.status(200).send({orders: orders});
        }
        else{
            logger.info(`Request status: ${res.status(200)} data Empty!`);
            res.status(200).send('Empty!');
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}

exports.merchantGetAllOrder = (req, res) =>{
    const userId = req.params.userId;
    Order.findAll({ 
        logging: (sql, queryObject) =>{
        logger.info(sql, queryObject);
      },
      include: [
        {
            model: Delivery,
            attributes: ['id', 'deliveryMethod', 'fee']
        },
        {
            model: PaymentMethod,
            attributes: ['id', 'paymentType']
        },
        {
            model: OrderDetail,
            attributes: ['id', 'quantity', 'price'],
            include: [
                {
                    model: Product,
                    attributes: ['id', 'proName', 'quantityValue', 'quantityId']
                }
            ]
        }
      ]
    })
    .then(orders => {
        if(orders){
            orders.forEach(order =>{
                var orderDetails = order.orderDetails;
                var totalPrice = 0;
                orderDetails.forEach(orderDetail => {
                    var unitPrice = orderDetail.price * orderDetail.quantity;
                    totalPrice = totalPrice + unitPrice;
                });
                totalPrice = totalPrice + order.deliveryMethod.fee;
                order.setDataValue('totalPrice', totalPrice);
            });
            orders.reverse();
            logger.info(`Request status: ${res.status(200)} data ${orders}`);
            res.status(200).send({orders: orders});
        }
        else{
            logger.info(`Request status: ${res.status(200)} data Empty!`);
            res.status(200).send('Empty!');
        }
    })
    .catch(err => {
        logger.error(`Request status: ${res.status(500)}  error ${err}`);
        res.status(500).send({message: err.message});
    })
}