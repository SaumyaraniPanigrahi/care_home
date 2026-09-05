const bcrypt = require("bcrypt");

const User = require("../models/User");
const Role = require("../models/Role");

const getUsers = async (req, res) => {
  try {
    const { email, firstName, lastName, role, status } = req.query;

    const filter = {};

    if (email) {
      filter.email = email;
    }

    if (firstName) {
      filter.firstName = firstName;
    }

    if (lastName) {
      filter.lastName = lastName;
    }

    if (role) {
      const userRole = await Role.findOne({
        name: role,
      });

      if (!userRole) {
        return res.status(400).json({
          message: "Invalid role",
        });
      }

      filter.role = userRole._id;
    }
    if (status) {
      if (!["ACTIVE", "INACTIVE"].includes(status)) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      filter.status = status;
    }

    const users = await User.find(filter).populate("role");

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("Get users error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, careHome } = req.body;

    // 1. Check required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    // 2. Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // 3. Find role
    const userRole = await Role.findOne({
      name: role,
    });

    if (!userRole) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: userRole._id,
      careHome,
      status: "ACTIVE",
    });

    // 6. Send response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: userRole.name,
        careHome: user.careHome,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Create user error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("role");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.name,
        careHome: user.careHome,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Get user error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 1. Check status
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    // 2. Check valid status
    if (!["ACTIVE", "INACTIVE"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // 3. Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      {
        new: true,
      },
    ).populate("role");

    // 4. Check user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 5. Return updated user
    res.status(200).json({
      message: "User status updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.name,
        careHome: user.careHome,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Update user status error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUserStatus,
};
