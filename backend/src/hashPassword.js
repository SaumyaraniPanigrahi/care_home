const bcrypt = require("bcrypt");

const password = "admin123";

const hashPassword = async () => {
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Hashed password:");
  console.log(hashedPassword);
};

hashPassword();
