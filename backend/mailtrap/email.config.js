import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'apikey',
        // pass: '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',
        pass: process.env.SENDGRID_API_KEY,
    },
});

export default transporter;
