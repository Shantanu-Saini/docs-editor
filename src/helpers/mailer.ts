import nodemailer from 'nodemailer';
import UserModel from '@/models/user.model';
import bcryptjs from 'bcryptjs';

export async function sendEmail({ email, emailType, userId }: any) {
    try {
        // create a hashed Token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // check email type
        if (emailType === 'reset') {
            await UserModel.findByIdAndUpdate(userId,
                {
                    forgetPasswordToken: hashedToken,
                    forgetPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
                }
            )
        }
        // else if (emailType === 'verify'){
        //     await UserModel.findByIdAndUpdate(userId,
        //         {
        //             verificationToken: hashedToken,
        //             verificationTokenExpiry: Date.now() + 3600000 // 1 hour
        //         }
        //     )
        // }
        else {
            console.log('Invalid email type');
        }

        // create email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_HOST,
                pass: process.env.EMAIL_PASS_HOST
            }
        });

        const mailOptions = {
            from: {
                name:"Pretty Good Docs",
                address: process.env.EMAIL_HOST!
            },
            to: email,
            subject: emailType === 'reset' ? "Reset Password Link" : "Invalid email type",
            html: `<p>Click <a href="${process.env.DOMAIN_NAME}/reset-password?token=${hashedToken}">here</a> to ${emailType === "reset" ? "reset your password" : "invalid email type"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN_NAME}/reset-password?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }

}