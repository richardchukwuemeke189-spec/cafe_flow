import transporter from "../services/mailService.js";

export const createReservation = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      time,
      partySize,
      specialRequest,
    } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.RECEIVER_EMAIL,

      subject: "New Reservation Request",

      html: `
        <h2>Reservation Request</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Date:</strong> ${date}</p>

        <p><strong>Time:</strong> ${time}</p>

        <p><strong>Party Size:</strong> ${partySize}</p>

        <p><strong>Special Request:</strong> ${specialRequest}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Reservation submitted",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Reservation failed",
    });
  }
};