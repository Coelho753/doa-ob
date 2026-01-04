const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Alimento", "Roupa"],
      required: true
    },

    description: String,

    totalQuantity: {
      type: Number,
      required: true
    },

    remainingQuantity: {
      type: Number,
      required: true
    },

    unit: {
      type: String,
      enum: ["kg", "unidade"],
      required: true
    },

    image: {
      type: String // caminho da imagem
    },

    location: {
      city: String,
      state: String,
      address: String
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", DonationSchema);
