const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book aplication." });
});

app.use("/api/contacts", contactsRouter);

// handle 404 response
app.use((req, res, next) => {
  // Code o day se chay khi khong co route duoc dinh nghia nao
  //khop voi yeu cau. Goi next() de chuyen sang middlware xu ly loi
  return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
  // Middleware xu ly loi tap trung
  // Trong cac doanj code xu ly o cac route, goi next(error)
  // se chuyenve middleware xu ly loi nay
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
