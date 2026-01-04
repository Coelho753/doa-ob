require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const pointsRoutes = require("./routes/points");
const donationsRoutes = require("./routes/donations");
const schedulesRoutes = require("./routes/schedules");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));

connectDB(process.env.MONGO_URI);

// Rotas
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/points", pointsRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/schedules", schedulesRoutes);

app.get("/", (req, res) => res.send("API Donations running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
