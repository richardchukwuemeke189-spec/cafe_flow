import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";
// import transporter from "../services/mailService.js";
// import resend from "../services/mailService.js";
import { sendEmail } from "../utils/sendEmail.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};




export const getDashboardStats = async (req, res) => {
  try {
    const { count: totalReservations } =
      await supabase
        .from("reservations")
        .select("*", { count: "exact", head: true });

    const { count: totalMessages } =
      await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true });

    const { count: pendingReservations } =
      await supabase
        .from("reservations")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

    const { count: unreadMessages } =
      await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

    res.status(200).json({
      success: true,
      stats: {
        totalReservations,
        totalMessages,
        pendingReservations,
        unreadMessages,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};




export const getRecentReservations = async (
  req,
  res
) => {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    if (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch reservations",
      });
    }

    res.status(200).json({
      success: true,
      reservations: data,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Server error fetching reservations",
    });
  }
};



export const getRecentMessages = async (
  req,
  res
) => {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch messages",
      });
    }

    res.status(200).json({
      success: true,
      messages: data,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Server error fetching messages",
    });
  }
};



export const getAllReservations = async (
  req,
  res
) => {
  try {
    const { data, error } =
      await supabase
        .from("reservations")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    res.json({
      success: true,
      reservations: data,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch reservations",
    });
  }
};



export const confirmReservation = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { error } =
      await supabase
        .from("reservations")
        .update({
          status: "Confirmed",
        })
        .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};



export const deleteReservation = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { error } =
      await supabase
        .from("reservations")
        .delete()
        .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};



export const getAllMessages = async (
  req,
  res
) => {
  try {
    const { data, error } =
      await supabase
        .from("contacts")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    res.json({
      success: true,
      messages: data,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch messages",
    });
  }
};



export const markMessageAsRead =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { error } =
        await supabase
          .from("contacts")
          .update({
            is_read: true,
          })
          .eq("id", id);

      if (error) throw error;

      res.json({
        success: true,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };



  export const markAllMessagesAsRead =
  async (req, res) => {
    try {
      const { error } =
        await supabase
          .from("contacts")
          .update({
            is_read: true,
          })
          .eq("is_read", false);

      if (error) throw error;

      res.json({
        success: true,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  };



  export const deleteMessage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { error } =
      await supabase
        .from("contacts")
        .delete()
        .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};



export const cancelReservation = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { error } =
      await supabase
        .from("reservations")
        .update({
          status: "Cancelled",
        })
        .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};



export const markAllMessagesRead =
  async (req, res) => {
    try {
      const { error } =
        await supabase
          .from("contacts")
          .update({
            is_read: true,
          })
          .eq(
            "is_read",
            false
          );

      if (error)
        throw error;

      res.json({
        success: true,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const updateReservationStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    
    const { data, error } =
    await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
    
    console.log("Reservation updated:", data);

    if (error) throw error;


    let emailSubject = "";
    let emailHTML = "";


    if (status === "Confirmed") {

      emailSubject = "☕ Reservation Confirmed";


      emailHTML = `
        <div style="font-family: Arial, sans-serif;">

          <h2>
            Reservation Confirmed 🎉
          </h2>

          <p>
            Hello ${data.name},
          </p>

          <p>
            Your reservation has been confirmed.
          </p>

          <p>
            <strong>Date:</strong> ${data.date}
          </p>

          <p>
            <strong>Time:</strong> ${data.time}
          </p>

          <p>
            <strong>Guests:</strong> ${data.party_size}
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

      emailSubject = "☕ Reservation Cancelled";


      emailHTML = `
        <div style="font-family: Arial, sans-serif;">

          <h2>
            Reservation Update
          </h2>

          <p>
            Hello ${data.name},
          </p>

          <p>
            Unfortunately, your reservation has been cancelled.
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



    // Send customer email in background
    if (emailHTML) {
      console.log("Sending customer email to:", data.email);
      sendEmail({
        to: data.email,
        subject: emailSubject,
        html: emailHTML,
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



    res.json({
      success: true,
      reservation: data,
    });


  } catch (error) {

    console.error(error);


    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ====================================================
export const markSelectedMessages = async (req, res) => {
  const { ids } = req.body;

  await supabase
    .from("messages")
    .update({ is_read: true })
    .in("id", ids);

  res.json({ success: true });
};

// ====================================================
export const deleteSelectedMessages = async (req, res) => {
  const { ids } = req.body;

  try {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .in("id", ids);

    if (error) throw error;

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete messages" });
  }
};