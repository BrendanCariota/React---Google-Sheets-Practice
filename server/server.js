import express from "express";
import { google } from "googleapis";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.listen(5000, (req, res) => console.log("Server running on PORT 5000"));
