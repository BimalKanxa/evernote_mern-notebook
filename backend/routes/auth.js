
const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const JWT_SECRET = "bimalisagoodboy";

// Route 1 : create a user using : POST "/api/auth. Doesnot require auth 
 
router.post('/createuser', [
    body('email', "please enter a valid email address").isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')

], async (req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()){ 
    return res.status(400).json({errors: errors.array() });
   }

   //check whether email already exists 
   try {
    let user = await User.findOne({email : req.body.email});
    if (user){
     return res.status(400).json({error : "Email address already exists"})
    }
    //using brycpt js
    
    const salt = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(req.body.password, salt)  

    // create new user
     user = await User.create({
     name : req.body.name, 
     email : req.body.email,
     password :  secPass,
    })

    const data = {
        user : {
            id : user.id      //sending id 
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);  //for digital signing of req

    // res.json(user)
    res.json({authtoken})     //it will return authtoken

   } catch (error) {  //if some internal error has occured
        console.error(error.message)
        res.status(500).send("Internal server error")
   }
  
   
})  
 
// Route 2 : authenticating a user using : POST "api/auth/login"

router.post('/login', [
    body('email', "please enter a valid email address").isEmail(),
    body('password','password cannot be blank').exists()

], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){ 
     return res.status(400).json({errors: errors.array() })
   }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "please enter valid credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "please enter valid credentials"})
        }

        const data = {
            user:{
                id: user.id  //sending payload in jwt
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET); 
        res.json(authtoken)
    } catch (error) {  //if some internal error has occured
        console.error(error.message)
        res.status(500).send("Internal server error")
   } 

})

// Route 3 : fetching login user details : POST "api/auth/getuser".  login required

router.post('/getuser', async (req, res) => {
    

try {
    let userId = 'todo';
    const user = await User.findById(userId).select("-password")
} catch (error) {
    console.error(error.message)
        res.status(500).send("Internal server error")
}
})


module.exports = router