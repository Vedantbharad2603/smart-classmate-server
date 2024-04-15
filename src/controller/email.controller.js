const emailService = require('../services/email.services');

const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    // Send email
    const emailSent = await emailService.sendEmail(to, subject, text, html);

    if (emailSent) {
      res.status(200).send('Email sent successfully');
    } else {
      res.status(500).send('Error sending email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};

module.exports = { sendEmail };
