const Parent = require('../models/Parent');
const bcrypt = require('bcryptjs');
exports.registerParent = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ msg: 'Please fill all required fields' });
    }

    let existing = await Parent.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const newParent = new Parent({ firstName, lastName, email, phone, password: hashed });
    await newParent.save();

    const { password: pw, ...parentSafe } = newParent.toObject();
    res.status(201).json({ msg: 'Parent registered', parent: parentSafe });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
