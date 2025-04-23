import jwt from "jsonwebtoken"

export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const generateTokenAndSetCookie = (res, userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('accessToken', accessToken,{
        httpOnly: true, //accessible only by the web server
        secure: process.env.VITE_MODE === 'production', //https 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return accessToken;
}