require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const app = express();

const bodyparser = require("body-parser");
const port = 3000;
const adminRoute = require("./routes/AdminRoute");
const authRoute = require("./routes/AuthRoute");
const usersRoute = require("./routes/UsersRoute");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/admin/", adminRoute);
app.use("/api/auth/", authRoute);
app.use("/api/users/", usersRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  console.log("Dokumentasi API tersedia di http://localhost:3000/api-docs");
});
