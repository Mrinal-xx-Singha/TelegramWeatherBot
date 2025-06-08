const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//* @desc Register Admin (optional for dev,not exposed in prod)
//* @route POST /api/auth/register
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    let existing = await Admin.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({
      email,
      password: hashed,
    });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("[AuthController.register]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//* @desc Admin Login
//* @route POST /api/auth/login

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // find admin if not found return 404 status code
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    // generate token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000, //1 day
      })
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("[AuthController.login]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.checkSelf =(req,res) =>{
  const token = req.cookies.token
  if(!token) return res.status(401).json({message:"Unauthorized"})

    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      return res.status(200).json({adminId:decoded.id})
    } catch (error) {
      return res.status(401).json({message:"Invalid Token"})
    }
}


//* @desc Admin Logout
//* route POST /api/auth/logout
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  }).json({message:"Logged out successfully"});
};
