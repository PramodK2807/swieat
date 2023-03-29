const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    location_name:{
        require:true,
        type:String
    },
    location_id:{
        require:true,
        type:Number
    },
    state_id:{
        require:true,
        type:Number
    },
    state:{
        require:true,
        type:String
    },
    country_name:{
        type:String,
        default:"India"
    }

})


module.exports = mongoose.model("cities", citySchema)