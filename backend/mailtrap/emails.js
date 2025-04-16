import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplate.js';
import { mailTrapClient, sender } from './mailtrap.config.js';

export const sendVerificationEmail = async (email, verificationCode) => {
    const recepient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recepient,
            subject: 'Verify Your Email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationCode),
            category: 'Email Verification',
        });

        console.log('Email sent successfully', response);
    } catch (error) {
        console.error('Failed to send verification email', error);
        throw new Error('Failed to send verification email: ', error);
    }
};

export const sendWelcomeEmail = async (email, userName) => {
    const recepient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recepient,
            template_uuid: '58444232-b814-4bd3-8606-9948e1618e12',
            template_variables: {
                company_info_name: 'My-Auth',
                name: userName,
            },
        });

        console.log('Welcome Email sent successfully', response);
    } catch (error) {
        console.error('Failed to send welcome email', error);

        throw new Error('Failed to send welcome email: ', error);
    }
};

export const sendResetPasswordEmail = async (email, resetUrl) => {
    const recepient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recepient,
            subject: 'Password Reset Request',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl),
            category: 'Password Reset',
        });
        console.log('Password Reset Email sent successfully', response);
    } catch (error) {
        console.error('Failed to send password reset email', error);
        throw new Error('Failed to send password reset email: ', error);
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recepient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recepient,
            subject: 'Password Reset Success',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset',
        });
        console.log('Password Reset Success Email sent successfully', response);
    } catch (error) {
        console.error('Failed to send password reset success email', error);
        throw new Error('Failed to send password reset success email: ', error);
    }
};
