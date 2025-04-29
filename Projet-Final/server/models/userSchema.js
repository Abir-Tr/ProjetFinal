const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "client"], default: "client" }, // 'admin', 'client'
  NumCin: { type: Number },
  NumTel: { type: Number, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
});

const User = mongoose.model("user", userSchema);
module.exports = { User };
