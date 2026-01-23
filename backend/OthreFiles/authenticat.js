// backend/middleware/authenticate.js
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { id: decoded.id }; // ✅ accessible in routes
    next();

  } catch (error) {
    return res.status(401).json({
      message: "User authentication failed",
      error: error.message
    });
  }
};
