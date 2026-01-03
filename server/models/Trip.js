import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
    },
    source: {
      type: String,
      required: [true, 'Source location is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination location is required'],
      trim: true,
    },
    travelDate: {
      type: String,
      required: [true, 'Travel date is required'],
    },
    travelTime: {
      type: String,
      required: [true, 'Travel time is required'],
    },
    transportMode: {
      type: String,
      enum: ['car', 'train', 'bus', 'walk'],
      required: [true, 'Transport mode is required'],
    },
    status: {
      type: String,
      enum: ['upcoming', 'completed'],
      default: 'upcoming',
    },
    distance: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    optimizedRoute: {
      type: {
        distance: String,
        duration: String,
        eta: String,
        fuelCost: String,
        tollCost: String,
      },
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Add virtual field for createdAt to match frontend format
tripSchema.virtual('createdAtFormatted').get(function () {
  return this.createdAt.toISOString().split('T')[0];
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;

