let {User} = require('../config/db');
var jwt = require('jsonwebtoken');

let isEmail = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await User.findOne({
             where: { email: user } 
        }).then(user=>{
            if(!user){
                next();
            }else{
                return res.status(400).json({
                    message : "Email already exists",
                    status: 400,
                    error : true,
                })
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })

    }
}

let checkLogin = async (req,res,next)=>{
    try {
        let user = req.body.email;
        await User.findOne({
            where: { email: user }
        })
        .then(user=>{
            if(!user){
                var message= "Username or password is invalid"
                res.render("login",{message:message}) 
            }else{
                req.user = user

                next();
            }
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "loi sever",
            status: 500,
            error : true
        })
    }
}

let getUserById = function getUserById(id){
    return User.findOne({_id:id})
}




module.exports ={
    isEmail,
    checkLogin,
    
}