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
  state: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  cartItems?: string[];
  orders?: string[];
  comparePassword(password: string): Promise<boolean>;
  addresses?: Address[];
  phoneNumber?: string; // Add mobileNumber field
  otp: string;
  otpExpiry: Date;
  verified: boolean;
}
