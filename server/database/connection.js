const mongoose =require('mongoose');

const DB =process.env.DATABASE
mongoose.connect(DB).then(()=>{
    console.log(`hello iam database `)

}).catch((err)=>console.log(`ups connection not successful`))



