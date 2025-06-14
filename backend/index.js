require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const { dbConnect } = require("./config/db.config");
const User = require("./models/User");
require("./config/passport");

const PORT = 4000;
const app = express();


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.send("Temporal API Backend Running");
});


app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  function (req, res) {
    res.redirect("http://localhost:5173/profileform");
  }
);


app.get("/auth/success", (req, res) => {
  res.send("Login successful!");
});

app.get("/auth/failure", (req, res) => {
  res.send("Login failed");
});


app.get("/profileform", (req, res) => {
  if (req.isAuthenticated()) {
    const { firstName, lastName, email, phone, city, pincode } = req.user;
    res.json({ firstName, lastName, email, phone, city, pincode });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});


app.post("/profileform/update", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { firstName, lastName, phone, city, pincode } = req.body;
    
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      {
        firstName,
        lastName,
        phone,
        city,
        pincode
      }, 
      { 
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

   
    req.user.firstName = firstName;
    req.user.lastName = lastName;
    req.user.phone = phone;
    req.user.city = city;
    req.user.pincode = pincode;

    res.json({ 
      message: "Profile updated successfully", 
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        city: updatedUser.city,
        pincode: updatedUser.pincode
      }
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile", details: err.message });
  }
});


app.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send("Logout failed");
    req.session.destroy((err) => {
      if (err) return res.status(500).send("Session destroy failed");
      res.clearCookie('connect.sid');
      res.send("Logged out successfully");
    });
  });
});


app.listen(PORT, () => {
  dbConnect();
  console.log(`Server running on port ${PORT}`);
});