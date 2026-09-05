const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const updatePassword = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    const user = await User.findOne({
      email: "admin@carehome.com",
    });

    if (!user) {
      console.log("User not found");
      return;
    }

    user.password =
      "$2b$10$NeJbT4tV7bMgc6lI3FG1TenIRcsr/OKPeYHeSIzcmM6Yz2mag9eBq";

    await user.save();

    console.log("Password updated successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
};

updatePassword();
