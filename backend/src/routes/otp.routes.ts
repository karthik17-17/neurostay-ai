import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "NeuroStay AI OTP Verification",
      text: `Your OTP is: ${otp}`,
    });

    console.log("OTP SENT:", otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log("OTP ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

export default router;