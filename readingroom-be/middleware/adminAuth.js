const jwt = require("jsonwebtoken");

//model
const Admin = require("../model/Admin");

const requireAdminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(400).json({ error: "Access denied. No token provided." });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decode.id);
    if (!admin) {
      return res.status(401).json({ error: "Invalid token. Admin not found." });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unauthorized access", error: error.message });
  }
};

module.exports = requireAdminAuth;
