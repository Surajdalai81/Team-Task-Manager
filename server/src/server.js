import app from "./app.js";
import projectRoutes from "./routes/projectRoutes.js";

app.use("/api/projects", projectRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});