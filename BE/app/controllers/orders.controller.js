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
    .then(orders =>{
        if(orders){
            orders.forEach(order =>{
                orderDetails = order.OrderDetail;
                var totalPrice = 0;
                orderDetails.forEach(orderDetail => {
                    var unitPrice = orderDetails.price * orderDetail.quantity;
                    totalPrice = totalPrice + unitPrice;
                });
                totalPrice = totalPrice + order.Delivery.fee;
                order.totalPrice = totalPrice;
            });
            res.status(200).send({orders:orders});
        }
        else{
            res.status(200).send('Empty!');
        }
    })
    .catch(err => {
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
        where:{userId: userId, orderId: orderId},
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
            orderDetails = order.OrderDetail;
            var totalPrice = 0;
            orderDetails.forEach(orderDetail => {
                var unitPrice = orderDetails.price * orderDetail.quantity;
                totalPrice = totalPrice + unitPrice;
            });
            totalPrice = totalPrice + order.Delivery.fee;
            order.totalPrice = totalPrice;
            res.status(200).send({order: order});
        }
        else{
            res.status(404).send({message: 'Not Found!'});
        }
    })
    .catch(err => {
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
        orderStatus: 0,//0: not delivery; 1: deliveried
        userId: userId, 
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveryId: req.body.deliveryId,
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
                    res.status(200).send({message: 'Success!'});
                }
                else{
                    res.status(500).send({message: 'Fail!'});
                }
            });
        }
        else{
            res.status(500).send({message:"Fail!"});
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}