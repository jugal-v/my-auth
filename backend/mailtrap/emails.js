import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplate.js';

import transporter from './email.config.js';

export const sendVerificationEmail = async (to, verificationCode) => {
    try {
        const info = await transporter.sendMail({
            from: 'vyasjugal18@gmail.com',
            to,
            subject: 'Verify Your Email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationCode),
        });
        console.log('Verification Email sent: ', info.messageId);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        throw new Error('Could not send verification email');
    }
};


export const sendWelcomeEmail = async (to, userName) => {
    try {
        const html = `
            <h1>Welcome to My-Auth, ${userName}!</h1>
            <p>We're thrilled to have you on board. Let's secure things together.</p>
        `;
        const info = await transporter.sendMail({
            from: 'vyasjugal18@gmail.com',
            to,
            subject: 'Welcome to My-Auth 🎉',
            html,
        });
        console.log('Welcome Email sent: ', info.messageId);
    } catch (error) {
        console.error('Failed to send welcome email:', error);
        throw new Error('Could not send welcome email');
    }
};


export const sendResetPasswordEmail = async (to, resetUrl) => {
    try {
        const info = await transporter.sendMail({
            from: 'vyasjugal18@gmail.com',
            to,
            subject: 'Password Reset Request',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl),
        });
        console.log('Reset Password Email sent: ', info.messageId);
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        throw new Error('Could not send password reset email');
    }
};


export const sendResetSuccessEmail = async (to) => {
    try {
        const info = await transporter.sendMail({
            from: 'vyasjugal18@gmail.com',
            to,
            subject: 'Password Reset Success',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
        console.log('Password Reset Success Email sent: ', info.messageId);
    } catch (error) {
        console.error('Failed to send password reset success email:', error);
        throw new Error('Could not send password reset success email');
    }
};
