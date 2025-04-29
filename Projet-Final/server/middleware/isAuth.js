var jwt = require("jsonwebtoken")
const {User} = require("../models/userSchema")

const isAuth = async(req , res , next)=>{
    try{
    const token = req.headers["authorization"];
    if(!token){
        res.send({msg:'session not available'})
    }else{
        const decoded = await jwt.verify(token , process.env.JWT_SECRET) 
        const user = await User.findById(decoded.id);
        if(user){
            req.user = user
            next()
        }
    }
}catch(error){
    res.status(401).json({msg:'invalid token'})
}
}


module.exports = isAuth