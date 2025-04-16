import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    
    const accessToken = req.cookies.accessToken;

    if(!accessToken){
        return res.status(401).json({success: false, message: 'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({success: false, message: 'Unauthorized: Invalid Token'});
        }
        req.userId = decoded.userId;
        next();
    }
    catch{
        console.log('error in verifyToken ', error);
        res.status(500).json({success: false, message: 'Server error'});
    }
}