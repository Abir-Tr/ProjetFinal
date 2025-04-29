const express = require("express");
const route = express.Router();
const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");

route.post("/addUser", async (req, res) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      NumCin: req.body.NumCin,
      NumTel: req.body.NumTel,
      role: req.body.role,
      password: req.body.password,
    });
    const saltRounds = 10;
    const cryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    newUser.password = cryptedPassword;
    await newUser.save();
    //     const payload = { id: newUser._id };

    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: "24h",
    // });
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(400).json({ error: "user not added" });
  }
});

// Connexion de l'utilisateur
route.post("/login", async (req, res) => {
  // const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // res.send("User not found");
      return res.status(404).json({ error: "User not found" });
    }else{
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }else{
      const payload = { id: user._id };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });
    res.status(200).json({ user, token });
  } }}catch (error) {
    // res.status(400).json({ error: "thffh" });
    res.status(500).json({ error: "Server error" });
  }
});

route.get("/afficherUser", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ allUsers });
  } catch (error) {
    res.status(400).json({ error });
  }
});

route.get(`/isAuth`, isAuth, (req, res) => {
  res.send({ user: req.user });
});

route.get(`/getOneUser/:id`, async (req, res) => {
  try {
    const oneUser = await User.findById(req.params.id);
    res.status(200).json({ oneUser });
  } catch (error) {
    res.status(400).json({ error });
  }
});


route.delete(`/deleteOneUser/:id`, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ deletedUser });
  } catch (error) {
    res.status(400).json({ error });
  }
});


// Inscription d'un utilisateur
route.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({
      userName,
      email,
      password,
    });

    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// route.post('/login', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.send('User not found');
//     }

//     const isMatch = await bcrypt.compare(req.body.password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({ error: 'JWT_SECRET not defined in environment variables' });
//     }

//     const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ user });

//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });



module.exports = route;
