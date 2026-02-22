import express from "express";
import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);
import cors from "cors";

import teacherRoutes from "./routes/teacherRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/teachers", teacherRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

app.get("/", (req, res) => {
  res.send("Backend Working");
});
