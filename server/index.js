const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send({ hey: "hello world" });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
