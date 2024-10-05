// controllers/addressController.ts
import { Request, Response } from "express";
import User, { Address } from "../models/userModel";
import catchAsyncError from "../middlewares/catchAsyncError";

// Controller to add address to a user
export const addAddress = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { firstname, lastname, mobile, email, pincode, city, street, zip, address ,state}: Address = req.body;

    if (!firstname || !lastname || !mobile || !email || !pincode || !city || !street || !zip || !address || !state) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.addresses = user.addresses || [];
      user.addresses.push(req.body);
      await user.save();
      res.status(201).json({ message: "Address added successfully", user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const updateAddress = catchAsyncError(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { addressIndex } = req.body;
    const { firstname, lastname, mobile, email, pincode, city, street, zip, address  , state}: Address = req.body;

    if (!firstname || !lastname || !mobile || !email || !pincode || !city || !street || !zip || !address || !state) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const index = parseInt(addressIndex);
      if (isNaN(index) || index < 0 || index >= (user.addresses?.length || 0)) {
        return res.status(404).json({ message: "Invalid address index" });
      }
      user.addresses = user.addresses || [];
      user.addresses[index] = req.body;
      await user.save();
      res.status(200).json({ message: "Address updated successfully", user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export const deleteAddress = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { addressIndex } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const index = parseInt(addressIndex);
    if (isNaN(index) || index < 0 || index >= (user.addresses?.length || 0)) {
      return res.status(404).json({ message: "Invalid address index" });
    }
    user.addresses = user.addresses || [];
    user.addresses.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Address deleted successfully", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const viewAddresses = async (req: Request, res: Response) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ addresses: user.addresses });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
