import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/user.model.js';
import { generateVerificationCode, generateTokenAndSetCookie } from '../utils/utils.js';
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ sucess: false, message: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const verificationToken = generateVerificationCode();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        await user.save();

        //jwt
        generateTokenAndSetCookie(res, user._id);

        // await sendVerificationEmail(user.email, verificationToken)
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            sucess: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({ sucess: false, message: error.message });
    }
};

export const login = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid Password' });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = Date.now();

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        console.log('error in login ', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log('error in verifyEmail ', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const forgotPassword = async (req, res) => {

    const {email}  = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({success: false, message: 'User not found'});
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: 'Password reset email sent successfully'});
    }
    catch{
        console.log('error in forgotPassword ', error);
        res.status(500).json({success: false, message: 'Server error'});
    } 

}

export const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    try{
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        });

        if(!user) {
            return res.status(400).json({success: false, message: 'Invalid or expired reset token'});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success: true, message: 'Password reset successfully'});
    }
    catch{

    }
}

export const checkAuth = async (req, res) => {

    try{
        const user = await User.findById(req.userId).select('-password');

        if(!user) {
            return res.status(400).json({success: false, message: 'User not found'});
        }

        res.status(200).json({success: true, user});
    }
    catch{
        console.log('error in checkAuth ', error);
        res.status(500).json({success: false, message: 'Server error'});
    }
}