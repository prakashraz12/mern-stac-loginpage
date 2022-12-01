// const { json } = require("express");
const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const Auth = require('../middleware/AuthMiddleware')

require("../database/connection");
const User = require("../models/UserSchema");

router.get("/", (req, res) => {
  res.send("Hello world gt");
});
router.post("/register", async (req, res) => {
  const { name, email, phone, password, confirmpassword , profession } = req.body;

  if (!name || !email || !phone || !password || !confirmpassword || !profession) {
    return res.status(422).json({ error: "please enter valid data" });
  }
  try {
    const userexist = await User.findOne({ email: email });
    if (userexist) {
      return res.status(422).json({ error: "email already exist" });
    }else if(password != confirmpassword){
        return res.status(422).json({error: " password doesn't match"})
    }else{
        const user = new User({ name, email, phone, password, confirmpassword, profession});
        // hasing password before register password in database
        const userRegister = await user.save();
        res.status(201).json({ message: "user registred successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route
router.post('/signin', async (req,res)=>{
    const {email , password} = req.body
    try{
    if(!email || !password){
        return res.status(400).json({error: "please enter valid data"})
    }
    const userLogin = await User.findOne({email: email});
    // console.log(userLogin)



if(userLogin){
  const isMatch = await bcrypt.compare(password, userLogin.password)
  // applying json web token 
  const token = await userLogin.generateAuthToken();
  console.log(token)

  res.cookie("jwtToken", token,{
    expires: new Date(Date.now() + 2589200000), //token expires
    httpOnly: true
  });

  if(!isMatch){
    res.status(400).json({error: "Invalid username or password"})
  }else{
    res.json({message: "user signin successsfully"})
  }
}else{
  res.status(400).json({error: "Invalid username or password"})
} 
}catch(err){
    console.log(err)

}
});

//authentication route

router.get('/about', Auth , (req,res)=>{
  console.log("iam about")
  res.send(req.rootUser);
})



module.exports = router;
