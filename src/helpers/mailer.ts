import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"


const { MAILTRAP_USER, MAILTRAP_PASS, EMAIL } = process.env;

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
    }
    else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })

    }

    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io", // Mailtrap's SMTP server
      port: 2525,               // Mailtrap's SMTP port
      auth: {
        user: MAILTRAP_USER,    // Your Mailtrap user
        pass: MAILTRAP_PASS,    // Your Mailtrap password
      },
    });
   

    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: emailType === 'VERIFY' ? "Verify your Email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "Please verify your email address." : "Click the link to reset your password."} or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse


  } catch (error: any) {
    throw new Error(error.message)

  }

}