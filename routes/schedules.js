const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Schedule = require('../models/Schedule');

router.post('/', auth, async (req, res) => {
  const { donationId, pointId, scheduledFor, notes } = req.body;

  if (!donationId || !pointId || !scheduledFor) {
    return res.status(400).json({ msg: 'Dados incompletos' });
  }

  const sched = await Schedule.create({
    donation: donationId,
    point: pointId,
    scheduledBy: req.user.id,
    scheduledFor,
    notes
  });

  res.json(sched);
});

router.get('/', auth, async (req, res) => {
  const schedules = await Schedule.find({ scheduledBy: req.user.id })
    .populate('donation point');

  res.json(schedules);
});

module.exports = router;
