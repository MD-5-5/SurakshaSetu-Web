import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// === SOCKET.IO IMPORTS ===
import { createServer } from "http";
import { Server } from "socket.io";
// ==========================

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// === SOCKET.IO SETUP ===
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Yahan apna REACT frontend ka URL daalna
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Admin panel connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Admin panel disconnected: ${socket.id}`);
  });
});
// =========================

// --- Aapke puraane routes ---
app.use("/api/users", userRoutes);

// === NAYA ALERT ROUTE ===
const alertRouter = express.Router();

// 1. Mobile App se naya alert lene ke liye (POST)
alertRouter.post("/new", (req, res) => {
  try {
    const alertData = req.body;
    console.log("NEW EMERGENCY ALERT RECEIVED:", alertData);

    // Yahan pe data database mein save kar sakte ho (agar zaroori hai)

    // Yeh line sabhi connected admin panels ko real-time data bhej degi
    io.emit("newAlert", alertData);

    res.status(200).json({ message: "Alert broadcasted successfully" });
  } catch (error) {
    console.error("Error broadcasting alert:", error);
    res.status(500).json({ message: "Failed to broadcast alert" });
  }
});

// 2. Admin Panel ko purana data dene ke liye (GET)
alertRouter.get("/", async (req, res) => {
  try {
    // ABHI KE LIYE, TESTING KE LIYE FAKE DATA BHEJ RAHE HAIN
    const alerts = [
      { id: "TEST001", type: "Test Alert 1", location: "Database", status: 'resolved', priority: 'medium' },
      { id: "TEST002", type: "Test Alert 2", location: "Database", status: 'in-progress', priority: 'high' },
    ];

    res.status(200).json(alerts);

  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
});

// Router ko register karo
app.use("/api/alert", alertRouter);
// ========================

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;

// === SERVER START ===
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// ====================