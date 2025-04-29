const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "Chambre simple",
      "Chambre double",
      "Chambre de luxe",
      "Suite junior",
    ],
    default: "Chambre simple",
  }, // chambre de lux / chambre standard/ Suite
    //  roomId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Room' },
  price: { type: Number, required: true },
  description: { type: String }, // Une chambre confortable avec vue sur la mer
    available: {type: Boolean },
  image: { type: String },
});

const Room = mongoose.model("room", roomSchema);
module.exports = { Room };
