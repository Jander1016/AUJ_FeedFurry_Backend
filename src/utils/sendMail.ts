import nodemailer, { Transporter, SendMailOptions, createTransport } from 'nodemailer';

export const sendEmailClient =  (
  host_email: string,
  server_port: number,
  server_email: string,
  pass_server_email: string,
  user_email: string,
  password_generated: string
):void => {

  const transporter: Transporter = createTransport({
    host: host_email,
    port: server_port,
    secure: false, 
    auth: {
      user: server_email, 
      pass: pass_server_email 
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions: SendMailOptions = {
    from: "Feed Furry<soporte@feddfurry.com>", 
    to: user_email, 
    subject: 'Password for Web Feedy Furry', 
    text: `Puedes iniciar sesión con tu correo electrónico y la siguiente contraseña: ${password_generated}`,
    html: `<p>Puedes iniciar sesión con tu correo electrónico y la siguiente contraseña: <b>${password_generated}</b></p>` 
  };

   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}
