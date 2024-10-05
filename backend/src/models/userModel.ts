import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface Address {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  pincode: string;
  city: string;
  street: string;
  zip: string;
  address: string;
  state:string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  cartItems?: Schema.Types.ObjectId[];
  orders?: Schema.Types.ObjectId[];
  comparePassword(password: string): Promise<boolean>;
  addresses?: Address[];
  phoneNumber?: string; // Add mobileNumber field
  otp: string;
  otpExpiry: Date;
  verified: boolean;
  wishlist: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: [true, "Role is required."],
    },
    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    addresses: [
      {
        firstname: String,
        lastname: String,
        mobile: String,
        email: String,
        pincode: String,
        city: String,
        street: String,
        zip: String,
        address: String,
        state: String,

      },
    ],
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required."],
      trim: true,
      unique: true,
    },
    otp: { type: String, required: false },
    otpExpiry: { type: Date, required: false },
    verified: { type: Boolean, required: true, default: false },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }]
  },
  { timestamps: true }
);

// Hash password before saving the user
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
