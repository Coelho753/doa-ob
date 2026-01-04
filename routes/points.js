const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Point = require('../models/Point');

router.post('/', auth, async (req, res) => {
  try {
    const data = req.body;
    data.createdBy = req.user.id;
    const point = await Point.create(data);
    res.json(point);
  } catch (err) { res.status(500).json({ msg: 'Erro ao criar ponto' }); }
});

router.get('/', async (req, res) => {
  const { city, category } = req.query;
  const filter = {};
  if (city) filter['address.city'] = city;
  if (category) filter.accepts = category;
  const points = await Point.find(filter).limit(200);
  res.json(points);
});

module.exports = router;
