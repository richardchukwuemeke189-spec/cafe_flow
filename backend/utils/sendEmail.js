// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, text }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"Cafe Reservations" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//   });
// };


import resend from "../services/mailService.js";

export const sendEmail = async ({
  to,
  subject,
  text,
}) => {

  try {

    const response = await resend.emails.send({

      from:
        "CafeFlow <onboarding@resend.dev>",

      to,

      subject,

      text,

    });


    console.log(
      "Email sent successfully:",
      response
    );


    return response;


  } catch (error) {

    console.error(
      "Email sending failed:",
      error
    );

    throw error;

  }

};