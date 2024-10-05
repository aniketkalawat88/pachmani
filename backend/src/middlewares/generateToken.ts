import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  const plainUser = user.toObject ? user.toObject() : user;
  return jwt.sign(plainUser, process.env.JWT_SECRET as string, {
    expiresIn: "2d",
  });
};
