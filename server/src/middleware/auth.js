import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;
    console.log("Token from cookies:", token);

    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "You need to be logged in to access this route" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    console.log("User found in database:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protect middleware:", error);
    res.status(401).json({ message: "Not authorized" });
  }
};