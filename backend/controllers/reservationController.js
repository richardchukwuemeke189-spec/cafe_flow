import supabase from "../config/supabaseClient.js";
import transporter from "../services/mailService.js";

export const createReservation = async (req, res) => {
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

    // Basic validation
    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !partySize
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          name,
          email,
          phone,
          date,
          time,
          party_size: partySize,
          special_request: specialRequest || "",
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error(
        "Supabase Reservation Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to save reservation",
      });
    }

    // Send Email Notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "☕ New Reservation Request",

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Reservation Request</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Date:</strong> ${date}</p>

          <p><strong>Time:</strong> ${time}</p>

          <p><strong>Party Size:</strong> ${partySize}</p>

          <p><strong>Special Request:</strong> ${
            specialRequest || "None"
          }</p>

          <hr />

          <p>
            This reservation has been saved to the database.
          </p>
        </div>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Reservation submitted successfully",
      reservation: data[0],
    });

  } catch (error) {
    console.error(
      "Reservation Controller Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Reservation failed",
    });
  }
};