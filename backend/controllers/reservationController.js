import supabase from "../config/supabaseClient.js";
import transporter from "../services/mailService.js";
import { sendEmail } from "../utils/sendEmail.js";

// export const createReservation = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       date,
//       time,
//       partySize,
//       specialRequest,
//     } = req.body;

//     // Basic validation
//     if (
//       !name ||
//       !email ||
//       !phone ||
//       !date ||
//       !time ||
//       !partySize
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields",
//       });
//     }

//     // Save to Supabase
//     const { data, error } = await supabase
//       .from("reservations")
//       .insert([
//         {
//           name,
//           email,
//           phone,
//           date,
//           time,
//           party_size: partySize,
//           special_request: specialRequest || "",
//           status: "pending",
//         },
//       ])
//       .select();

//     if (error) {
//       console.error(
//         "Supabase Reservation Error:",
//         error
//       );

//       return res.status(500).json({
//         success: false,
//         message: "Failed to save reservation",
//       });
//     }

//     // Send Email Notification
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.RECEIVER_EMAIL,
//       subject: "☕ New Reservation Request",

//       html: `
//         <div style="font-family: Arial, sans-serif;">
//           <h2>New Reservation Request</h2>

//           <p><strong>Name:</strong> ${name}</p>

//           <p><strong>Email:</strong> ${email}</p>

//           <p><strong>Phone:</strong> ${phone}</p>

//           <p><strong>Date:</strong> ${date}</p>

//           <p><strong>Time:</strong> ${time}</p>

//           <p><strong>Party Size:</strong> ${partySize}</p>

//           <p><strong>Special Request:</strong> ${
//             specialRequest || "None"
//           }</p>

//           <hr />

//           <p>
//             This reservation has been saved to the database.
//           </p>
//         </div>
//       `,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Reservation submitted successfully",
//       reservation: data[0],
//     });

//   } catch (error) {
//     console.error(
//       "Reservation Controller Error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Reservation failed",
//     });
//   }
// };

// ===================update and reply to user=================
// export const updateReservationStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     // 1. Update reservation
//     const { data: reservation, error } = await supabase
//       .from("reservations")
//       .update({ status })
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) throw error;

//     // 2. Decide message
//     let emailText = "";

//     if (status === "Confirmed") {
//       emailText = `Hello ${reservation.name},

// Good news 🎉

// Your reservation has been ACCEPTED.

// We look forward to serving you at our café.

// Thank you for choosing us.`;
//     }

//     if (status === "Cancelled") {
//       emailText = `Hello ${reservation.name},

// We are sorry 😔

// Your reservation has been CANCELLED.

// Please feel free to book again anytime.`;
//     }

//     // 3. Send email
//     await sendEmail({
//       to: reservation.email,
//       subject: "Reservation Update",
//       text: emailText,
//     });

//     return res.json({ success: true, reservation });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Failed to update reservation" });
//   }
// };


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

    // Validation
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

    console.log("Reservation request received");

    // Save to Supabase first
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
          status: "Pending",
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

    console.log("Reservation saved");

    // Return success immediately
    res.status(201).json({
      success: true,
      message: "Reservation submitted successfully",
      reservation: data[0],
    });

    // Send admin email in background
    transporter
      .sendMail({
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

            <p>
              <strong>Special Request:</strong>
              ${specialRequest || "None"}
            </p>
          </div>
        `,
      })
      .then(() =>
        console.log(
          "Admin reservation email sent"
        )
      )
      .catch((err) =>
        console.error(
          "Admin reservation email failed:",
          err
        )
      );

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


export const updateReservationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const { data: reservation, error } =
      await supabase
        .from("reservations")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    // Return immediately
    res.json({
      success: true,
      reservation,
    });

    let emailText = "";

    if (status === "Confirmed") {
      emailText = `Hello ${reservation.name},

Good news 🎉

Your reservation has been confirmed.

Date: ${reservation.date}
Time: ${reservation.time}

We look forward to serving you.

CafeFlow`;
    }

    if (status === "Cancelled") {
      emailText = `Hello ${reservation.name},

We regret to inform you that your reservation has been cancelled.

Please feel free to make another reservation anytime.

CafeFlow`;
    }

    if (emailText) {
      sendEmail({
        to: reservation.email,
        subject: "Reservation Update",
        text: emailText,
      })
        .then(() =>
          console.log(
            "Customer status email sent"
          )
        )
        .catch((err) =>
          console.error(
            "Customer status email failed:",
            err
          )
        );
    }

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error:
        "Failed to update reservation",
    });
  }
};