import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a new interface that extends the Request interface
interface AuthenticatedRequest extends Request {
  user?: any;
}

const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.token ||
    req.headers.authorization ||
    req.cookies["next-auth.session-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decodedToken: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      if (!decodedToken || decodedToken.role !== "admin") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Admin access required" });
      }
      req.user = decodedToken;
      next();
    }
  );
};

export default isAdmin;