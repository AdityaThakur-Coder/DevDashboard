import 'dotenv/config';
import express from 'express';
import User from '../models/User.js';
import axios from 'axios';

const router = express.Router();

router.post('/upsert', async (req, res) => {
  const { sub, firstName, lastName, phone, city, pincode } = req.body;

  let user = await User.findOne({ sub });

  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.city = city;
    user.pincode = pincode;
  } else {
    user = new User({ sub, firstName, lastName, phone, city, pincode });
  }

  await user.save();

  res.status(200).json(user);
});

router.get('/:sub', async (req, res) => {
  const user = await User.findOne({ sub: req.params.sub });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

export default router;
