const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")

const User=require("../model/user")
const constants=require('../util/constants')


//Test methods
exports.getHome=(req,res,next)=>{
    res.status(200).json({page: "Home!"})
}

exports.getTest=(req,res,next)=>{
    res.status(200).json({page: "Test!"})
}

exports.getUserAuthenticatedTest=(req,res,next)=>{
    res.status(200).json({page: "You are authenticated"})
}




//Original methods

exports.postUserSignup=(req,res,next)=>{
    var emailPatternMatch = /[abcdefghijklmnopqrstuvwxyz@.1234567890_]/ig
    var namePatternMatch = /[abcdefghijklmnopqrstuvwxyz]/ig
    var passwordPatternMatch = /[abcdefghijklmnopqrstuvwxyz@.1234567890_!@#$%&]/ig

    var name=req.body.name
    var email=req.body.email
    var password=req.body.pwd
    var dp=req.body.dp
    var address=req.body.address
    var location=req.body.location

    var userDetailsObject
    var flag
    if(email.search(/@/i)<0)
        flag=0
    else
        flag=1

    if(!!(name.fname.match(namePatternMatch) && name.lname.match(namePatternMatch) && email.match(emailPatternMatch) && password.match(passwordPatternMatch) && flag))
    {
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            userDetailsObject=new User({
                name: name,
                email: email,
                pwd: hashedPassword,
                dp: dp,
                address: address,
                location: location
            })
            //Check if this email already exist in DB
            User.findOne({email: req.body.email})
            .then(storedUser=>{
                if(storedUser)
                    res.status(401).json({response: constants.string1, status: constants.status2})    
                else
                {
                    userDetailsObject.save()
                    .then(result=>{
                        console.log(constants.string2)
                        res.status(201).json({response: constants.string2, status: constants.status1})
                    })
                    .catch(err=>{
                        console.log(constants.status2)
                        console.log(err)
                        res.status(501).json({response: constants.string3, status: constants.status2})
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(501).json({response: constants.string3, status: constants.status2})
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(501).json({response: constants.string4, status: constants.status2})
    })
    
    }
    else
        res.status(501).json({response: constants.string4, status: constants.status2})
}


exports.postUserLogin=(req,res,next)=>{
    
    var email=req.body.email
    var password=req.body.pwd

    User.findOne({email: email})
    .then(storedUser=>{
        if(!storedUser)
            res.status(501).json({response: constants.string5, status: constants.status2})
        else
        {
            bcrypt.compare(password,storedUser.pwd)
            .then(doMatch=>{
                if(doMatch)
                {
                    const token=jwt.sign(
                        {
                            id: storedUser._id,
                            fname: new Buffer.from(storedUser.name.fname).toString('base64'),
                            lname: new Buffer.from(storedUser.name.lname).toString('base64'),
                            email: storedUser.email,
                            dp: storedUser.dp,
                            address: storedUser.address,
                            location: storedUser.location,
                            dateCreated: storedUser.dateCreated,
                            orders: storedUser.orders
                        },
                        process.env.SecretKey,
                        {expiresIn: process.env.jwtExpiry}
                    )
                    res.status(200).json({ token:token, userId: storedUser._id.toString() ,status: constants.status1})
                }
                else
                    res.status(501).json({response: constants.string7, status: constants.status2})
            })
            .catch(err=>{
                res.status(501).json({response: constants.string6, status: constants.status2})
            })
        }
    })
    .catch(err=>{
        res.status(501).json({response: constants.string3, status: constants.status2})
    })
}

