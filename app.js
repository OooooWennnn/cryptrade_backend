const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
console.log("MONGO_URI:", process.env.ATLAS_URI);
const port = process.env.PORT || 3000;

const dbo = require("./db/conn");

const tradeRoutes = require("./routes/trade_routes");
const premiumRoutes = require("./routes/premium_routes");
const authRoutes = require("./routes/auth_routes");

const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/trade", tradeRoutes);
app.use("/api/premium", premiumRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, async () => {
  const response = await dbo.connectToServer();
  if (!response.connected) return;
  console.log("Server running on port ", port);
});
