const mongoose = require('mongoose')

var category = mongoose.model('category',{
    name : {type:String}
})

module.exports = { category }