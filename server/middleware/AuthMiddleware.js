const jwt = require("jsonwebtoken")
//auth middleware page

const User = require("../models/UserSchema")
const Auth = async (req,res, next)=>{
  try{
    const token = req.cookies?.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY );
    const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token": token})
    if(!rootUser){throw new Error("user not found")}
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  }catch(err){
    res.status(401).send("unauthorized:No token provided");
    console.log(err)
  }
}
module.exports = Auth;