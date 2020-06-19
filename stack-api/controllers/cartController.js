const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId


var { cart } = require('../models/cart')

router.get('/',(req,res)=>{
    cart.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/',(req,res)=>{
    var newRecord= new cart({
        type: req.body.type,
        email: req.body.email,
        p_id: req.body.p_id,
        p_name: req.body.p_name,
        p_price: req.body.p_price,
        p_discount: req.body.p_discount,
        p_quantity : req.body.quantity,
        total : req.body.total,
        p_image : req.body.p_image
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    var updateRecords={
        type: req.body.type,
        payment: req.body.payment
    }

    cart.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    cart.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

module.exports = router