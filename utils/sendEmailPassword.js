import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail', // يمكنك استخدام أي مزود آخر
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
// دالة لإرسال بريد إلكتروني يحتوي على رمز التحقق
export const sendVerificationCode = (email,name, otp) => {
    const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${otp}`,
        html: `
                <p>Hello ${name},</p>
                <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">
                    Your verification code is: <strong>${otp}</strong>
                </p>
                <p style="color: red; margin: 5px 0px;">This code will be expired in 5 minutes</p>
                <p>Best wishes,</p>
            `,
    };
    return transporter.sendMail(mailOptions);
};