import supabase from "../config/supabaseClient.js";
import resend from "../services/mailService.js";


// ===============================
// CREATE RESERVATION
// ===============================

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


    // Save reservation
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


    // Respond immediately
    res.status(201).json({
      success: true,
      message: "Reservation submitted successfully",
      reservation: data[0],
    });



    // Send admin email in background
    resend.emails
      .send({

        from: "CafeFlow <onboarding@resend.dev>",

        to: process.env.RECEIVER_EMAIL,

        subject: "☕ New Reservation Request",

        html: `
          <div style="font-family: Arial, sans-serif;">

            <h2>
              New Reservation Request
            </h2>


            <p>
              <strong>Name:</strong> ${name}
            </p>


            <p>
              <strong>Email:</strong> ${email}
            </p>


            <p>
              <strong>Phone:</strong> ${phone}
            </p>


            <p>
              <strong>Date:</strong> ${date}
            </p>


            <p>
              <strong>Time:</strong> ${time}
            </p>


            <p>
              <strong>Party Size:</strong> ${partySize}
            </p>


            <p>
              <strong>Special Request:</strong>
              ${specialRequest || "None"}
            </p>


          </div>
        `,
      })

      .then(() => {
        console.log(
          "Admin reservation email sent"
        );
      })

      .catch((err) => {
        console.error(
          "Admin reservation email failed:",
          err
        );
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




// ===============================
// UPDATE RESERVATION STATUS
// ===============================

export const updateReservationStatus = async (
  req,
  res
) => {

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



    // Respond immediately
    res.json({
      success: true,
      reservation,
    });



    let emailSubject = "";
    let emailHTML = "";



    if (status === "Confirmed") {

      emailSubject =
        "☕ Reservation Confirmed";


      emailHTML = `

        <div style="font-family: Arial, sans-serif;">

          <h2>
            Reservation Confirmed 🎉
          </h2>


          <p>
            Hello ${reservation.name},
          </p>


          <p>
            Your reservation has been confirmed.
          </p>


          <p>
            <strong>Date:</strong>
            ${reservation.date}
          </p>


          <p>
            <strong>Time:</strong>
            ${reservation.time}
          </p>


          <p>
            We look forward to serving you.
          </p>


          <p>
            CafeFlow
          </p>

        </div>

      `;
    }



    if (status === "Cancelled") {

      emailSubject =
        "☕ Reservation Cancelled";


      emailHTML = `

        <div style="font-family: Arial, sans-serif;">

          <h2>
            Reservation Update
          </h2>


          <p>
            Hello ${reservation.name},
          </p>


          <p>
            We regret to inform you that your reservation has been cancelled.
          </p>


          <p>
            Please feel free to make another reservation anytime.
          </p>


          <p>
            CafeFlow
          </p>

        </div>

      `;
    }



    if (emailHTML) {

      resend.emails
        .send({

          from:
            "CafeFlow <onboarding@resend.dev>",

          to:
            reservation.email,

          subject:
            emailSubject,

          html:
            emailHTML,

        })

        .then(() => {

          console.log(
            "Customer status email sent"
          );

        })

        .catch((err) => {

          console.error(
            "Customer status email failed:",
            err
          );

        });

    }



  } catch (err) {

    console.error(
      "Update Reservation Error:",
      err
    );


    return res.status(500).json({

      success: false,

      message:
        "Failed to update reservation",

    });

  }
};