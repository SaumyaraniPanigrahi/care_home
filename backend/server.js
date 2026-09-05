const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const careHomeRoutes = require("./src/routes/careHomeRoutes");
const residentRoutes = require("./src/routes/residentRoutes");
const medicationRoutes = require("./src/routes/medicationRoutes");
const residentNoteRoutes = require("./src/routes/residentNoteRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/care-homes", careHomeRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api", medicationRoutes);
app.use("/api", residentNoteRoutes);

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Care Home API is running",
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
