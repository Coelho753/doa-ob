const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const auth = require("../middlewares/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { type, description, totalQuantity, unit } = req.body;

    if (!type || !totalQuantity || !unit) {
      return res.status(400).json({ error: "Dados obrigatórios ausentes" });
    }

    const donation = await Donation.create({
      type,
      description,
      totalQuantity,
      remainingQuantity: totalQuantity,
      unit,
      user: req.user.id
    });

    res.status(201).json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar doação" });
  }
});

// LISTAR DOAÇÕES DISPONÍVEIS (remainingQuantity > 0)
router.get("/available", async (req, res) => {
  try {
    const donations = await Donation.find({
      remainingQuantity: { $gt: 0 }
    }).populate("user", "name email");

    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar doações" });
  }
});

// RESERVAR DOAÇÃO (deduz quantidade)
router.post("/:id/reserve", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ error: "Doação não encontrada" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantidade inválida" });
    }

    if (donation.remainingQuantity < quantity) {
      return res.status(400).json({ error: "Quantidade indisponível" });
    }

    donation.remainingQuantity -= quantity;
    await donation.save();

    res.json({
      message: "Doação reservada com sucesso",
      remainingQuantity: donation.remainingQuantity
    });

  } catch (err) {
    res.status(500).json({ error: "Erro ao reservar doação" });
  }
});


module.exports = router;
