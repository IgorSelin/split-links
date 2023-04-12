const express = require("express");
const config = require("config");
const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const app = express();
const PORT = config.get("port") || 5000;
const mongoURL = config.get("mongoUrl");
const path = require("path");
app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__resolve, "client", "build", "index.thml"));
  });
}

const start = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}!`)
    );
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
};

start();
