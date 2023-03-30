const nodemailer = require("nodemailer");
module.exports.sendMail = async function sendMail(str, data) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "riteshm887@gmail.com",
      pass: "svoodczgiwmhssgi",
    },
  });

  let Osubject, Ohtml;
  if (str == "signup") {
    Osubject = `Thank you for signing ${data.name}`;

    Ohtml = `
                <h1>Welcome to savari.com</h1>
                Hope you have a good time!
                Here are your details-
                Name - ${data.name}
                Email - ${data.email}
            `;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
                <h1>Savari.com</h1>
                Here is your link to reset password!
                ${data.resetPasswordLink}
            `;
  }

  let info = await transporter.sendMail({
    from: '"Savari 🚌" <riteshm887@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
