const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");





const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API Working");
});


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);

app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

app.use("/api/v1/payments", paymentRoutes);

app.use("/api/v1/reviews", reviewRoutes);

app.use("/api/v1/delivery", deliveryRoutes);

module.exports = app;
