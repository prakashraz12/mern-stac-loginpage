const express = require('express');

const app = express();

const dotenv = require('dotenv')

const port =process.env.port || 5000

dotenv.config({path:'./.env'})

require('./database/connection')
// const User = require('./models/UserSchema')
app.use(express.json());
//we link routes here
app.use(require('./Router/auth'))


app.listen(port,(req,res)=>{
    console.log(`server started at port`)
})


