// This is where we write implementations to send emails 


// import packages 
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// load env variables 
dotenv.config()

// function to send email to users 
export  const sendEmail = async(to:string,subject:string,html?:string)=>{

    try {
        // object is used to send emails 
        const transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST, //the email server 
            port:465, //the entry point to the email server
            service:'gmail',
            secure: true, //ensure connections to gmail server is secure 
            auth:{ //credentials of the account used to send send email NB:use the App passs rather than actual one
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        })

        const mailOptions:nodemailer.SendMailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        }
        // mail response 
        const mailRes = await transporter.sendMail(mailOptions)
        console.log('Mail Sent',mailRes);

        if(mailRes.accepted.length>0) return "Email Sent Successfully"
        if(mailRes.rejected.length>0) return "Email not Sent"
        return 'Email Server Error'

    } catch (error:any) {
        console.log("Error sending Mail",error.message)
        return JSON.stringify(error.message)
    }
}
