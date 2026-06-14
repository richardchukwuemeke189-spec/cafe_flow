import jwt from "jsonwebtoken";
import supabase from "../config/supabaseClient.js";
import transporter from "../services/mailService.js";

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

    if (error) throw error;

    let emailSubject = "";
    let emailText = "";

    if (status === "Confirmed") {
      emailSubject =
        "Reservation Confirmed";

      emailText = `
        Hello ${data.name},

        Your reservation has been confirmed.

        Date: ${data.date}
        Time: ${data.time}
        Guests: ${data.party_size}

        We look forward to serving you.

        Thank you.
      `;
    }

    if (status === "Cancelled") {
      emailSubject =
        "Reservation Cancelled";

      emailText = `
        Hello ${data.name},

        Unfortunately, your reservation has been cancelled.

        If you would like to make another reservation, please contact us.

        Thank you.
      `;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: emailSubject,
      text: emailText,
    });

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