const express = require('express');
const app = express();
const cors = require('cors');
const JWT = require('jsonwebtoken');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3100

require('./db/config')

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const City = require('./models/city')
const Location = require('./models/location');
const RestData = require('./models/restData');
const MealType = require('./models/mealtype');
const Menu = require('./models/menu');
const UserModel = require('./models/UserModel');
const hashPassword = require('./helper/authHelper');
const { compare } = require('bcrypt');



app.get('/', (req, res) => {
    res.send("Hi I am database")
})

app.get('/location', async (req, res) => {
    try {
        let city = await City.find()
        if(city){
            res.status(200).send({
                success: true,
                message: "All City fetched successfully.",
                city
            })
        }
        else{
            res.status(500).send({
                success: false,
                message:"No city found"
            })
        }
    } 
    catch (error) {
        res.status(500).send({
            success: false,
            message:"Failed to get data"
        })
    }
    
})

// app.get('/location', async (req, res) => {
//     try {
//         let city = await Location.find()
//         if(city){
//             res.status(200).send({
//                 success: true,
//                 message: "All Location fetched successfully.",
//                 city
//             })
//         }
//         else{
//             res.status(500).send({
//                 success: false,
//                 message:"No Location Found"
//             })
//         }
//     } 
//     catch (error) {
//         res.status(500).send({
//             success: false,
//             message:"Failed to get data"
//         })
//     }
    
// })

app.get('/location/:id', async (req, res) => {
    let locationId = +req.params.id
    let location = await Location.find({state_id:locationId})
    res.send(location)
})

app.get('/restaurant', async (req, res) => {
    let query = {}
    let stateId = +req.query.stateId
    let mealId = +req.query.mealId
    if(stateId){
        query = {state_id:stateId}
    }
    else if(mealId){
        query = {"mealTypes.mealtype_id":mealId}
    }

    else{
        query = {}
    }
    let location = await RestData.find(query)
    res.send(location)
})

app.get('/mealType', async (req, res) => {
    let meal = await MealType.find()
    res.send(meal)
})

// app.get('/mealType/:mealtypeId', async (req, res) => {
//     let mealtypeId = +req.params.mealtypeId
//     let meal = await MealType.find()
//     res.send(meal)
// })

app.get('/restaurant/details/:id', async (req, res) => {
    let restaurant_id = +req.params.id
    let restaurantData = await RestData.find({restaurant_id})
    res.send(restaurantData)
})

// MENU WRT REST
app.get('/restaurant/menu/:id', async (req, res) => {
    let restaurant_id = +req.params.id
    let restaurantData = await Menu.find({restaurant_id})
    res.send(restaurantData)
})

// FILTER

app.get('/filter/:mealId', async (req, res) => {
    let mealId = +req.params.mealId
    let cuisineId = +req.query.cuisineId
    let lCost = +req.query.lCost
    let hCost = +req.query.hCost

    let query = {}
    if(cuisineId){
        query = { 
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }
    else if(hCost && lCost){
        query = {
            "mealTypes.mealtype_id":mealId,
            "$and":[{cost:{$gt:lCost, $lt:hCost}}]
        }
    }
    else{
        query = {"mealTypes.mealtype_id":mealId}
    }
    let location = await RestData.find(query)
    res.send(location)
})

app.get('/filter', async (req, res) => {
    // let mealId = +req.params.mealId
    let cuisineId = +req.query.cuisineId
    let lCost = +req.query.lCost
    let hCost = +req.query.hCost

    let query = {}
    if(cuisineId){
        query = { 
            // "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }
    else if(hCost && lCost){
        query = {
            // "mealTypes.mealtype_id":mealId,
            "$and":[{cost:{$gt:lCost, $lt:hCost}}]
        }
    }
    else{
        // query = {"mealTypes.mealtype_id":mealId}
    }
    let location = await RestData.find(query)
    res.send(location)
})


// app.post('/orders', async(req,res)=> {

// })


app.post('/register', async(req, res) => {
    let {name, email, password, cpassword, mobile} = req.body;
    if (!name || !email || !password || !cpassword || !mobile) {
        return res.status(500).send({
            success: false,
            message : "Please enter all details"
        })
    }

    try {
        // Check Existing User
        let existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message : "Email already registered",
            })
        }

        let hashedPassword = await hashPassword(password)

        let user = await new UserModel({
            name, 
            email, 
            password:hashedPassword, 
            cpassword:hashedPassword, 
            mobile
        })

        await user.save()
        res.status(200).send({
            success: true,
            message: "User Registered Successfully",
            user
        })

    } 
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message : "Error while registration"
        })
    }
});


// LOGIN
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user already exists
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not registered or Invalid",

            })
        }
        if (!password || !email) {
            return res.status(404).send({
                success: false,
                message: "Please Enter email and password",

            })
        }

        const matchPassword = await compare(password, user.password)
        if (!matchPassword) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            })
        }

        // generate token 

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                isAdmin: user.isAdmin
            },
            token
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Invalid Credentials",
            error,
        })
    }
})


app.listen(PORT)