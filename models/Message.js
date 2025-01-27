const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services (e.g., SendGrid, Mailgun)
  auth: {
    user: 'your-email@gmail.com', 
    pass: 'your-email-password'   
  }
});


async function sendInvitationEmail(guest) {
  const mailOptions = {
    from: 'your-email@gmail.com',  // Sender email
    to: guest.email,               // Recipient email
    subject: 'Baby Shower Invitation',
    html: `
      <h1>You're Invited!</h1>
      <p>Dear ${guest.name},</p>
      <p>We are thrilled to invite you to a Baby Shower for our upcoming little one! Here are the details:</p>
      <p>Date: [Insert Date]<br>Time: [Insert Time]<br>Location: [Insert Location]</p>
      <p>Please RSVP by clicking the link below:</p>
      <a href="http://example.com/rsvp/${guest.id}">RSVP Here</a>
      <p>Looking forward to celebrating with you!</p>
      <p>Best regards,<br>The Baby Shower Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Invitation sent to ${guest.email}`);
  } catch (error) {
    console.error(`Error sending invitation to ${guest.email}: ${error}`);
  }
}


async function sendReminderEmail(guest) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: guest.email,
    subject: 'RSVP Reminder: Baby Shower',
    html: `
      <h1>Reminder: Baby Shower RSVP</h1>
      <p>Dear ${guest.name},</p>
      <p>This is a friendly reminder to RSVP for the Baby Shower:</p>
      <p>Date: [Insert Date]<br>Time: [Insert Time]<br>Location: [Insert Location]</p>
      <p>If you haven't already, please RSVP as soon as possible.</p>
      <a href="http://example.com/rsvp/${guest.id}">RSVP Here</a>
      <p>Looking forward to seeing you there!</p>
      <p>Best regards,<br>The Baby Shower Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent to ${guest.email}`);
  } catch (error) {
    console.error(`Error sending reminder to ${guest.email}: ${error}`);
  }
}


async function sendThankYouEmail(guest) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: guest.email,
    subject: 'Thank You for Attending the Baby Shower!',
    html: `
      <h1>Thank You!</h1>
      <p>Dear ${guest.name},</p>
      <p>Thank you so much for attending our Baby Shower. We are grateful for your presence and your generous gift.</p>
      <p>Your support means the world to us, and we look forward to seeing you again soon.</p>
      <p>Warm regards,<br>The Baby Shower Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Thank-you sent to ${guest.email}`);
  } catch (error) {
    console.error(`Error sending thank-you to ${guest.email}: ${error}`);
  }
}

module.exports = {
  sendInvitationEmail,
  sendReminderEmail,
  sendThankYouEmail
};
