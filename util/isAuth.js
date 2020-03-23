const jwt=require('jsonwebtoken')

const constants=require("./constants")

module.exports=(req,res,next)=>{
    var token=null
    if(req.get('Authorization'))
    {
        token=req.get('Authorization').split(' ')[1]
    }

    let decodedToken
    try
    {
        decodedToken=jwt.verify(token,process.env.SecretKey)
    }
    catch(err)
    {
        err.statusCode=500;
        res.status(err.statusCode).json({response: err.name, status: constants.status2})
        throw err;
    }
    if(!decodedToken)
        {
            const error=new Error('not authenticated');
            error.statusCode=401;
            res.status(error.statusCode).json({response: error.name, status: constants.status2})
            throw error;
        }
        req.userId=decodedToken.userId;
        next()
}