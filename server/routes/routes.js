const express = require('express');
const router = express.Router();

const Manager = require('../model/manager');
const Provider = require('../model/provider');
const Order = require('../model/order');


router.get('/providers', (req, res) => {
    return Provider.find( (err, providers) => {
        if (!err) {
            return res.send(providers);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/providers', (req, res) => {
    const provider = new Provider({provider: req.body.provider});
    return provider.save( (err) => {
        if (!err) {
            return res.send({ status: 'OK', provider:provider });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
        }
    });
});

router.get('/managers', (req, res) => {
    return Manager.find( (err, managers) => {
        if (!err) {
            return res.send(managers);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/managers', (req, res) => {
    const manager = new Manager({manager: req.body.manager});
    return manager.save((err) => {
        if (!err) {
            return res.send({ status: 'OK', manager:manager });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
        }
    });
});


router.get('/orders', (req, res) => {
    return Order.find().sort({ createdAt: -1 }).populate('provider').populate('managerName').exec( (err, orders) => {
        if (!err) {
            return res.send(orders);
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.get('/orders/:id', function(req, res) {
    return Order.findById( req.params.id, (err, order) => {
        if (!order) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', order:order });
        } else {
            res.statusCode = 500;
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/orders', function(req, res) {
    const order = new Order({
        managerName: req.body.managerName,
        orderType: req.body.orderType, 
        clientName: req.body.clientName,
        provider: req.body.provider,
        createdAt: req.body.createdAt,
        expiresAt: req.body.expiresAt,
        orderId: req.body.orderId
    });
    return order.save((err) => {
        if (!err) {
            return res.send({ status: 'OK', order:order });
        } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
        }
    });
});

router.put('/orders/:id', (req, res) => {
    Order.findByIdAndUpdate(req.params.id, {
        managerName: req.body.managerName,
        orderType: req.body.orderType, 
        clientName: req.body.clientName,
        provider: req.body.provider,
        createdAt: req.body.createdAt,
        expiresAt: req.body.expiresAt,
        orderId: req.body.orderId
    }, (err) => {
      if (err){
        return res.send(err);
      }
      return res.send({ status: 'OK'});
    });
});

router.delete('/orders/:id', (req, res) => {
    Order.remove({ _id: req.params.id }, (err) => {
      if (err){
        return res.send(err);
      }
      return res.send({ status: 'OK'});
    });
});


module.exports = router;