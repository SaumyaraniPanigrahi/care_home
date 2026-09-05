const express = require("express");
const app = express();
app.use(express.json());
app.get("/users", (req, res) => {
  res.send("Users");
});

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  res.send(`User ${name} with email ${email} created`);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
