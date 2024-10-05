import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Define the user property on the Request object
    }
  }
}

const authenticateToken = (
  req: Request,
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
    (err: jwt.VerifyErrors | null, decodedToken: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decodedToken;
      next();
    }
  );
};


export default authenticateToken;