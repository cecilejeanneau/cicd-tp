const express = require("express");
const { getGreeting } = require("./greeting");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/hello/:name?", (req, res) => {
  let name = req.params.name;
  // Decode URI component to handle Unicode characters
  if (typeof name === "string") {
    try {
      name = decodeURIComponent(name);
    } catch (e) {
      return res.status(400).send("Invalid name encoding");
    }
  }
  res.send(getGreeting(name));
});

app.post("/hello", (req, res) => {
  const name = req.headers["x-name"];

  res.send(getGreeting(name));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
