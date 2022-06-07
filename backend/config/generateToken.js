const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = async(userId) => {

    const generated = await jwt.sign({userId},process.env.SECRET_KEY,{expiresIn : '30d'})
    return generated
}

module.exports = generateToken;