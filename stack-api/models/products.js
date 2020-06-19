const mongoose = require('mongoose')

var product = mongoose.model('product',{
    name : {type:String},
    description : {type:String},
    category : {type:String},
    quantity : {type:Number},
    price : {type:Number},
    discount : {type:Number},
    image : {type:String},
})

module.exports = { product }