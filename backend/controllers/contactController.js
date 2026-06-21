// import supabase from "../config/supabaseClient.js";
// import transporter from "../services/mailService.js";

// export const sendContactMessage = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       subject,
//       message,
//     } = req.body;

//     // Validation
//     if (
//       !name ||
//       !email ||
//       !subject ||
//       !message
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all fields",
//       });
//     }

//     // Save to Supabase
//     const { data, error } = await supabase
//       .from("contacts")
//       .insert([
//         {
//           name,
//           email,
//           subject,
//           message,
//         },
//       ])
//       .select();

//     if (error) {
//       console.error(
//         "Supabase Contact Error:",
//         error
//       );

//       return res.status(500).json({
//         success: false,
//         message: "Failed to save message",
//       });
//     }

//     // Send Email Notification
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,

//       to: process.env.RECEIVER_EMAIL,

//       subject: `☕ New Contact Message - ${subject}`,

//       html: `
//         <div style="font-family: Arial, sans-serif;">
//           <h2>New Contact Message</h2>

//           <p><strong>Name:</strong> ${name}</p>

//           <p><strong>Email:</strong> ${email}</p>

//           <p><strong>Subject:</strong> ${subject}</p>

//           <p><strong>Message:</strong></p>

//           <p>${message}</p>

//           <hr />

//           <p>
//             This message has been saved to the database.
//           </p>
//         </div>
//       `,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       contact: data[0],
//     });

//   } catch (error) {
//     console.error(
//       "Contact Controller Error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to send message",
//     });
//   }
// };


import supabase from "../config/supabaseClient.js";
import transporter from "../services/mailService.js";

export const sendContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    console.log("Contact request received");

    // Save to database first
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          subject,
          message,
        },
      ])
      .select();

    if (error) {
      console.error(
        "Supabase Contact Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to save message",
      });
    }

    console.log("Message saved to database");

    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact: data[0],
    });

    // Send email in background
    transporter
      .sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL,
        subject: `☕ New Contact Message - ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Contact Message</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Subject:</strong> ${subject}</p>

            <p><strong>Message:</strong></p>

            <p>${message}</p>

            <hr />

            <p>
              This message has been saved to the database.
            </p>
          </div>
        `,
      })
      .then(() =>
        console.log(
          "Contact email sent successfully"
        )
      )
      .catch((err) =>
        console.error(
          "Contact email failed:",
          err
        )
      );

  } catch (error) {
    console.error(
      "Contact Controller Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};