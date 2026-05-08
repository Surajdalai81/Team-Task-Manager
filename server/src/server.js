import app from "./app.js";
import projectRoutes from "./routes/projectRoutes.js";

app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("Team Task Manager Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});