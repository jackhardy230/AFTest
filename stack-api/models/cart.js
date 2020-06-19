const mongoose = require('mongoose')

var cart = mongoose.model('cart',{
    type: {type:String},
    email: {type:String},
    p_id: {type:String},
    p_name: {type:String},
    p_price: {type:Number},
    p_discount: {type:Number},
    p_quantity : {type:Number},
    total : {type:Number},
    p_image : {type:String},
    payment: {type:String}
})

module.exports = { cart }