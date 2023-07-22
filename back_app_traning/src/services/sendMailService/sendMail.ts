import { createTransport } from "nodemailer";
import { sendMailConfig } from "../../config";

const transporter = createTransport({
  host: sendMailConfig.host,
  port: sendMailConfig.port,
  secure: sendMailConfig.secure, // connection SSL in server mail if true else TLS
  auth: {
    user: sendMailConfig.auth.user,
    pass: sendMailConfig.auth.pass,
  },
});

const sendMail = async ({ emails, subject, text, html, messageReturn }: ISendMailServicesProps): Promise<ISendMailReturn> => {
  try {
    const info = await transporter.sendMail({
      from: `APP TRAINING <${sendMailConfig.auth.user}>`,
      to: emails,
      subject,
      text,
      html,
    });

    return { 
      error: false,
      success: true,
      message: messageReturn ? messageReturn : `Email enviado com sucesso! id_msg: ${info}`
    };

  } catch (error: any) {
    return { 
      error: true,
      success: false,
      message: error
    };
  }
};

export { sendMail };
