const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required:true,
        minlength:[6, "password shold be min length is 6"]
        
    },
    confirmpassword:{
        type: String,
        required: true
    },
    profession:{
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
})



userSchema.pre('save', async function(next){
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 12);
      this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
    }
    next();
})

// generating token
userSchema.methods.generateAuthToken = async function(){
    try{
     let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
     this.tokens = this.tokens.concat({token: token});
     await this.save();
     return token;
    }catch(err){
console.log(err)
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;