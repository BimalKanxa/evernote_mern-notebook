
const express = require("express")
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

// create a user using : POST "/api/auth. Doesnot require auth"
 
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
     user = await User.create({
     name : req.body.name, 
     email : req.body.email,
     password : req.body.password,
    })
    res.json(user)
   } catch (error) {  //if some internal error has occured
        console.error(error.message)
        res.status(500).send("Some error has occured")
   }
  
   
})  
 


module.exports = router