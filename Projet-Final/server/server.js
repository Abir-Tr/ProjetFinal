const express = require("express");
const app = express();
require("dotenv").config();
const { connectDb } = require("./DataBase/connectDb");
const path = require("path");
const userRouter = require("./routes/userRouter");
const reservationRouter = require("./routes/reservationRouter");
const roomRouter = require("./routes/roomRouter");
const menuRouter = require("./routes/menuRouter");
//  const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:3000', // Frontend's URL
//   credentials: true,
// }));
app.use(express.json());
//les parentheses ya abir ba3d el json
app.use("/users", userRouter);
app.use("/menu", menuRouter);
app.use("/rooms", roomRouter);
app.use("/reservation", reservationRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDb();
app.listen(process.env.PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`sever is connecting on http://localhost:${process.env.PORT}`)
);
