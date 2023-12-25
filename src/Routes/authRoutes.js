const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/users');

require('dotenv').config();

// Error Handler middleware
const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        //check if all required feilds are provided
        if( !name || !email || !mobile || !password ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        

        //check if email is already registered
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(403).json({ error:'Email is Already Registered' });
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user
        const user = new User({ name, email, mobile, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ user: user.email }, process.env.JWT_SECRET);
        
        
        res.json({
          status: 'SUCCESS',
          token,
          user: email,
          name: name
        });
    } catch (error) {
      errorHandler(res, error);
    }  
});


//Login routes
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if email password has provided
        if(!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        //find user
        const user = await User.findOne({ email });
        if (user) {
          const hasPasswordMatched = await bcrypt.compare(password, user.password);
          if (hasPasswordMatched) {
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET );
            res.json({
              status: 'SUCCESS',
              message: "You've logged in successfully!",
              token, recruiterName: user.name, user: email
            });
          } else {
            return res.status(401).json({
                status: 'FAILED',
                message: 'Invalid Email or Password'
            });
          }
        } else {
          return res.status(401).json({
            status: 'FAILED',
            message: 'Invalid Email or Password'
          });
        }
    } catch (error) {
        errorHandler(res, error);
    }
});




module.exports = router;