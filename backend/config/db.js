const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


const conn = mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then((result)=>{
    console.log("the mongoose has been connected")
}).catch(err => {
    console.log(err)
})


module.exports = conn