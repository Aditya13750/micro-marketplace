import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verify user still exists
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ msg: "Not authorized - User no longer exists" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Not authorized" });
    }
  } else {
    return res.status(401).json({ msg: "No token" });
  }
};

export default protect;