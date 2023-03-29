const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location_id:{
        type:Number,
        required:true
    },
    location_name:{
        type:String,
        required:true
    },
    state_id:{
        type:Number,
        required:true
    },
    country_name:{
        type:String,
        default:"India"
    },
    state:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("locations", locationSchema)