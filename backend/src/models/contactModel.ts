import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IContactUs extends Document {
  email: string;
  name: string;
  phoneNumber: string;
  message: string;
}

const contactUsSchema: Schema<IContactUs> = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"]
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Please fill a valid phone number"]
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const ContactUs: Model<IContactUs> = mongoose.model<IContactUs>('ContactUs', contactUsSchema);

export default ContactUs;
