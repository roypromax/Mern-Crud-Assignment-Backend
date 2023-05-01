const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1];
    if(token){
        jwt.verify(token, 'masai', function(err, decoded) {
            if(decoded){
                req.body.author = decoded.author;
                req.body.authorID = decoded.authorID;
                next();
            }else{
                res.status(400).send({err:err}).json();
            }
          });
    }else{
        res.status(400).send({err:"Please Login first"}).json();
    }

}


module.exports = {authenticate};