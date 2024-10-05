import { Document, Schema, model } from "mongoose";

export interface ICarousel {
  desktopFileId: string;
  desktopUrl: string;
  mobileFileId: string;
  mobileUrl: string;
}

export interface IPage extends Document {
  pageName: string;
  carousels: ICarousel[];
}

const carouselSchema = new Schema<ICarousel>({
  desktopFileId: {
    type: String,
    required: true,
  },
  desktopUrl: {
    type: String,
    required: true,
  },
  mobileFileId: {
    type: String,
    required: true,
  },
  mobileUrl: {
    type: String,
    required: true,
  },
});

const pageSchema = new Schema<IPage>(
  {
    pageName: {
      type: String,
      required: true,
      unique: true,
    },
    carousels: [carouselSchema],
  },
  { timestamps: true }
);

export default model<IPage>("Page", pageSchema);
