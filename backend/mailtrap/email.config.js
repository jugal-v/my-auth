import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'apikey',
        // pass: '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',
    },
});

export default transporter;
