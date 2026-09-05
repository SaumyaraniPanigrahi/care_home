const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const login = async (req, res) => {
  console.log("LOGIN API HIT");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Check account status
    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        message: "User account is inactive",
      });
    }

    // 4. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 5. Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    // 6. Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  login,
};
