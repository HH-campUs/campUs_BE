// import nodemailer from 'nodemailer'
// import dotenv from 'dotenv'
// dotenv.config()


// export const sendEmail = async (email:string)=>{
// const certificationNumber = Math.random().toString().substring(2,6)
//   const trasporter = nodemailer.createTransport({
//    //사용하고자 하는 서비스 
//    service: 'gmail',
//    // host를 gmail로 설정
//    host: 'smtp.gmail.com',
//    port: 587,
//    secure: false,
//    auth: {
//      // Gmail 주소 입력, 'testmail@gmail.com'
//      user: process.env.NODEMAILER_USER,
//      // Gmail 패스워드 입력
//      pass: process.env.NODEMAILER_PW,
//    },
//  })
//   //  send mail with defined transport object
//   const emailForm = await trasporter.sendMail({
//     from: `"campus Team" <${process.env.NODEMAILER_USER}>`,
//     to: email,
//     subject: 'campus 이메일 인증',
//     text: '<p>campus 이메일 인증요청이예용</P>',
//     html: `<b>${certificationNumber}</b>`,
//   });

//   console.log('Message sent: %s', emailForm.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
// }