import { Document, Schema, model } from "mongoose";
import { Address, IUser } from "./userModel";

export interface IOrderItem {
  product: Schema.Types.ObjectId;
  variant: Schema.Types.ObjectId; // Add variant field
  quantity: number;
}
export interface IOrder extends Document {
  user: IUser["_id"];
  items: IOrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  paymentStatus: "unpaid" | "paid" | "partially_paid";
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: {
    type: Schema.Types.ObjectId,
    ref: "ProductVariant",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
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
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "partially_paid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);
