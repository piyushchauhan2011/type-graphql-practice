import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const mailOptions = {
    from: '"Fred Foo :happy-zombie:" <foo@example.com>',
    to: email,
    subject: "Hello :check:",
    text: "Hello world?",
    html: `<a href="${url}">${url}</a>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
