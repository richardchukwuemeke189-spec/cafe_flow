import resend from "../services/mailService.js";

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}) => {
  try {
    const response = await resend.emails.send({
      from: "CafeFlow <onboarding@resend.dev>",
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully");

    return response;

  } catch (error) {
    console.error(
      "Email sending failed:",
      error
    );

    throw error;
  }
};