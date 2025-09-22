module.exports.welcomeEmail = (username, email) => ({
  from: process.env.SENDER_EMAIL,
  to: email,
  subject: "Welcome to Reading Room!",
  html: `<h1>Hello ${username},</h1>
          <img src="cid:welcomeimg" alt="Welcome Image"  style="width:100%; height:300px; object-fit:cover;"/>
          <p>Welcome to Reading Room. We're excited to have you on board!</p>
          <p>You can now explore our collection of books and start your reading journey.</p>
          <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
          <p>Happy reading!</p>
          <p>The Reading Room Team</p>
          <p><b>Note:</b> This is an automated email, please do not reply.</p>
          <p><b>Disclaimer: This is developed for learning purposes only. Do not share any personal information.</b></p>`,
  attachments: [
    {
      filename: "welcome.jpg",
      path: __dirname + "/../images/welcome.jpg",
      cid: "welcomeimg",
    },
  ],
});
