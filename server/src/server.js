import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});