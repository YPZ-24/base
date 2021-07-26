import config from '../../config/config'
import nodemailer from 'nodemailer';

const TRANSPORTER = nodemailer.createTransport({
    host: config.DOMAIN.NAME,
    port: Number(config.DOMAIN.PORT),
    secure: true,
    auth:{
        user: config.DOMAIN.EMAIL.USER,
        pass: config.DOMAIN.EMAIL.PASSWORD
    }  
})

export const sendEmail = async ({contentHTML, subject, email}) => {
    await TRANSPORTER.sendMail({
        from: `<${config.DOMAIN.EMAIL.USER}>`,
        to: email,
        subject: subject,
        html: contentHTML
    });
}
