import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NeuroStay Backend Running");
});

app.post("/api/hotels/search", (req, res) => {
  const { query } = req.body;

  res.json([
    {
      id: 1,
      name: "Hotel Paradise",
      city: query,
      price: "₹1200",
      rating: 4.5,
      matchScore: 95,
      why: "Budget friendly hotel with WiFi and AC"
    },
    {
      id: 2,
      name: "NeuroStay Inn",
      city: query,
      price: "₹1500",
      rating: 4.2,
      matchScore: 90,
      why: "Good location and affordable"
    }
  ]);
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 8080, () => {
      console.log(
        `Server running on port ${
          process.env.PORT || 8080
        }`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });