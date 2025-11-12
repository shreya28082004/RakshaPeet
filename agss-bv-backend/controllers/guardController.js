const Guard = require('../models/Guard');
const bcrypt = require('bcryptjs');

exports.registerGuard = async (req, res) => {
  try {
    console.log("📥 Incoming Guard registration request:", req.body); // ✅ LOG 1

    const { firstName, lastName, phone, email, password } = req.body;

    // ✅ Basic validation (email optional)
    if (!firstName || !lastName || !phone || !password) {
      console.warn("⚠️ Missing required fields"); // ✅ LOG 2
      return res.status(400).json({ msg: 'Please fill all required fields' });
    }

    // ✅ If email is provided → check for duplicate
    if (email) {
      const existing = await Guard.findOne({ email });
      if (existing) {
        console.warn("⚠️ Email already exists:", email); // ✅ LOG 3
        return res.status(400).json({ msg: 'Email already registered' });
      }
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);
    console.log("🔒 Password hashed successfully"); // ✅ LOG 4

    // ✅ Save new guard
    const newGuard = new Guard({
      firstName,
      lastName,
      phone,
      email: email || null,
      password: hashed
    });

    await newGuard.save();
    console.log("✅ Guard saved to database:", newGuard); // ✅ LOG 5

    // ✅ Remove password before sending response
    const { password: pw, ...safeGuard } = newGuard.toObject();

    res.status(201).json({
      msg: 'Guard registered successfully',
      guard: safeGuard
    });

  } catch (err) {
    console.error("❌ Server error in registerGuard:", err); // ✅ LOG 6
    res.status(500).json({ msg: 'Server error' });
  }
};
