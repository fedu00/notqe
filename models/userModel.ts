import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    unique: true,
  },
  doneTasks: {
    categories: {
      health: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
      work: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
      study: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
      other: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
    },
    importanceLevel: {
      noImportant: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
      lessImportant: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
      mediumImportant: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
      important: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
      veryImportant: {
        type: Number,
        default: 0,
        min: [0, "Value can not be negative"],
      },
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
