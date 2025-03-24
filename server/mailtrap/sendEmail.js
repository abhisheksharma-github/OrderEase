// filepath: c:\Users\abhishek sharma\Desktop\Order-Ease\sendEmail.js
const nodemailer = require('nodemailer');

// Create a transporter using Mailtrap SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'your-mailtrap-username', // Replace with your Mailtrap username
        pass: 'your-mailtrap-password'  // Replace with your Mailtrap password
    }
});

// Send a verification email
const sendVerificationEmail = async (toEmail, verificationLink) => {
    const mailOptions = {
        from: '"Order-Ease" <no-reply@order-ease.com>', // Sender address
        to: toEmail, // Recipient address
        subject: 'Verify Your Email Address',
        html: `<p>Thank you for signing up! Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}">Verify Email</a>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Example usage
const userEmail = 'user@example.com';
const verificationLink = 'https://your-app.com/verify?token=123456';
sendVerificationEmail(userEmail, verificationLink);