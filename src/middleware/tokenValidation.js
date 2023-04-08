import jwt from 'jsonwebtoken';

export const checkToken = async (req, res, next)=>{
    // console.log("req body",req.body);
    let token = req.headers.authorization;
    // console.log("token::", token);
    let jwtSecretKey = process.env.jwtSecretKey;
    // console.log("jwt:::",jwtSecretKey );

    if(token === null) return res.sendStatus(401);

    token = token.split(' ')[1];
    // console.log("token split::", token);
    jwt.verify(token, jwtSecretKey, (error, user) => {
        // console.log("user::", user);
        if (error)
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        req.user = user;
        next();
        })
}