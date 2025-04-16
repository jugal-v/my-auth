import { MailtrapClient } from 'mailtrap';

const TOKEN = '9ab9dc07d4eb45c911c5e464714d0448';

export const mailTrapClient = new MailtrapClient({
    token: TOKEN,
});

export const sender = {
    email: 'hello@demomailtrap.co',
    name: 'Mailtrap Test',
};


// client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: 'You are awesome!',
//         text: 'Congrats for sending test email with Mailtrap!',
//         category: 'Integration Test',
//     })
//     .then(console.log, console.error);
