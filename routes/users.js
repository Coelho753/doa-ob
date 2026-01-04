const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Atualizar dados econômicos
router.put("/economic-info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { employmentStatus, housingType, income, dependents } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        economicInfo: {
          employmentStatus,
          housingType,
          income,
          dependents
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Dados econômicos salvos com sucesso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar dados econômicos" });
  }
});

module.exports = router;
