import nodemailer from "nodemailer";

export const sendMails = async (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_User,
            pass: process.env.EMAIL_Pass
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    })
};