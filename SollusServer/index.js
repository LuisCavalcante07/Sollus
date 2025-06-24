import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connect from "./database.js";

import authRoutes from "./routes/auth.route.js";
import dataRoutes from "./routes/data.route.js";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: "http://172.20.10.3:8081",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

app.listen(PORT, () => {
  connect();
  console.log("Server running on port: ", PORT);
});