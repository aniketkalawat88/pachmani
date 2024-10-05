import mongoose, { Document, Schema, Model } from "mongoose";

export interface IReview {
  text?: string;
  rating?: number;
  images?: { fileId: string; url: string }[];
}

export interface IProductVariant extends Document {
  _id: Schema.Types.ObjectId;
  packSize: number;
  price: number;
  stock: number;
  unit: "ml" | "mg" | "kg" | "gram";
  howToUse: string[];
  discount?: number;
  priceAfterDiscount?: number;
}

export interface IProduct extends Document {
  productName: string;
  description: string;
  highlights?: string[];
  category: "hairCare" | "skincare" | "mens" | "healthcare";
  reviews?: IReview[];
  variants: IProductVariant[];
  thumbnail?: { fileId: string; url: string };
  images?: { fileId: string; url: string }[];
  ingredients?:string[];
  howToUse: string[];
  likedBy: Schema.Types.ObjectId[];
  isAvailable: boolean;
}

const productSchema: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    highlights: {
      type: [String],
    },
    category: {
      type: String,
      enum: ["hairCare", "skincare", "mens"],
      // required: true,
    },
    reviews: [
      {
        text: {
          type: String,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        images: [
          {
            fileId: { type: String, default: "" },
            url: { type: String, default: "" },
          },
        ],
      },
    ],
    variants: [{ type: Schema.Types.ObjectId, ref: "ProductVariant" }],
    thumbnail: {
      type: Object,
      default: {
        fileId: "",
        url: "https://plus.unsplash.com/premium_photo-1699534403319-978d740f9297?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    images: {
      type: [
        {
          type: {
            fileId: { type: String, default: "" },
            url: {
              type: String,
              default:
                "https://plus.unsplash.com/premium_photo-1699534403319-978d740f9297?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          },
        },
      ],
    },
    ingredients: [],
    howToUse: {
      type: [String],
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
