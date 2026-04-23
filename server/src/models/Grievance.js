import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Academics', 'Facilities', 'Administration', 'Other']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Pending', 'In Review', 'Resolved'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

const Grievance = mongoose.model('Grievance', grievanceSchema);

export default Grievance;
