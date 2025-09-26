module.exports.LoginEmail = (username, email) => ({
  from: process.env.SENDER_EMAIL,
  to: email,
  subject: "New Login to Your Reading Room Account",
  html: `<h1>Hello ${username},</h1>
            <img src="cid:welcomeimg" alt="Welcome Image"  style="width:100%; height:300px; object-fit:cover;"/>
            <p>We noticed a new login to your Reading Room account.</p>
            <p>If this was you, you can safely ignore this email.</p>
            <p>If you did <b>not</b> perform this login, please reset your password immediately and contact our support team.</p>
            <p>Login details:</p>
            <ul>
            <li><b>Date & Time:</b> ${new Date().toLocaleString()}</li>
            </ul>
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
