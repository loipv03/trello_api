import nodemailer from 'nodemailer'
import contentEmail from './contentEmail'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (email: string, origin: string) => {
    const activationUrl = `${origin}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Activation',
        html: contentEmail(activationUrl),
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail