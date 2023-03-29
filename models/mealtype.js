const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    mealtype_id:{
        type:Number,
        required:true
    },
    mealtype:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    meal_image:{
        type:String,
    }
})

module.exports = mongoose.model("mealtypes", mealSchema)