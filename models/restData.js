const mongoose = require('mongoose');

const restSchema = new mongoose.Schema({
    location_id:{
        type:Number,
        required:true
    },
    restaurant_id:{
        type:Number,
        required:true
    },
    restaurant_name:{
        type:String,
        required:true
    },
    restaurant_thumb:{
        type:String,
        required:true
    },
    state_id:{
        type:Number,
        required:true
    },
    average_rating:{
        type:Number,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    contact_number:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        default:"India"
    },
    rating_text:{
        type:String,
        required:true
    },
    // mealTypes,
    // image_gallery
})

module.exports = mongoose.model("restaurantdatas", restSchema)