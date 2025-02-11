const numCPUs = require("os").cpus().length;
const express = require("express");
const http = require("http");
const cluster = require("cluster");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// MongoDB URI from .env
const uri = process.env.DATABASE_URL || "your-mongodb-uri";

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = http.createServer(app);

  app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests only from frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Allow cookies and authentication headers
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET));
  app.use(helmet());

  const schoolRouter = require("./routes/school");
  const teacherRouter = require("./routes/teacher");
  const parentRouter = require("./routes/parent");

  app.use("/school", schoolRouter);
  app.use("/teacher", teacherRouter);
  app.use("/parent", parentRouter);

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
      process.exit(1);
    });

  // Express-Session with MongoStore
  app.use(
    session({
      secret: process.env.ACCESS_TOKEN_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: uri }),
    })
  );

  // Start Server
  const PORT = process.env.PORT || 1234;
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on http://localhost:${PORT}`);
  });
}
