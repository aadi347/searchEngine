import mongoose from 'mongoose';

const PropertyRegistrationSchema = new mongoose.Schema(
  {
    flatType: {
      type: String,
      enum: ['1BHK', '2BHK', '3BHK', '4BHK'], 
      required: true,
    },
    rent: {
      type: Number, 
      min: 0, 
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    parking: {
      type: String,
      enum: [
        '2-wheeler Shaded',
        '2-wheeler Not Shaded',
        '4-wheeler Shaded',
        '4-wheeler Not Shaded',
      ], 
      required: true,
    },
    utilities: {
      type: String,
      enum: ['24/7', 'Limited Hours'], 
      required: true,
    },
    houseName: {
      type: String,
      required: true,
    },
    deposit: {
      type: Number, 
      min: 0, 
      required: true,
    },
    carpetArea: {
      type: Number, 
      min: 100, 
      required: true,
    },
  },
  { timestamps: true } 
);

export const PropertyRegistration = mongoose.model('PropertyRegistration', PropertyRegistrationSchema);
