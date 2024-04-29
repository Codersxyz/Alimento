import mongoose from 'mongoose';

const RestaurantuserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return value === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    avatar:{
      type: String,
      default: "client\public\blank profile.png"
    },
  },
  { timestamps: true }
);

const RestaurantUser = mongoose.model('Restaurant User', RestaurantuserSchema);

export default RestaurantUser;
