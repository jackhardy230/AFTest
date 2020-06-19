const mongoose=require('mongoose')
//model
const Comment=mongoose.model('Comment',{
    message:{type:String},
    product:{type:String},
    user:{type:String},
    rate:{type:Number},
})
module.exports={Comment}
