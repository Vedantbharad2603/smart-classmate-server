const nodemailer = require('nodemailer');

// Define your SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Set to true if using SSL/TLS
  auth: {
    user: 'devan.patel.ict@gmail.com',
    pass: 'yoje lden hssm gybo',
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    // Send email
    await transporter.sendMail({
      from: {
        name: 'LORETO - Academy of English',
        address:'devan.patel.ict@gmail.com'
      },
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendEmail };
