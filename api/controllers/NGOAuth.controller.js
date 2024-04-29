import NGOUser from "../models/NGOUser.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const NGOsignup = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new NGOUser({ username, email, password: hashedPassword, confirmPassword: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
}

export const NGOsignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validNGOUser = await NGOUser.findOne({ email });
    if (!validNGOUser) return next(errorHandler(404, 'User not found!'));
    const validNGOPassword = bcryptjs.compareSync(password, validNGOUser.password);
    if (!validNGOPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validNGOUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validNGOUser._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); 
};

const sendOTPEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}`,
    html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p>`
  };

  await transporter.sendMail(mailOptions);
};


// Temporary storage for OTPs (just for demonstration)
const otpStore = new Map(); // Key: email, Value: OTP

export const NGOForgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await NGOUser.findOne({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    const otp = generateOTP();
    otpStore.set(email, otp); // Store OTP temporarily
    await sendOTPEmail(email, otp);
   

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const NGOverifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(otp);
  console.log(otpStore.get(email));
  try {
    // Retrieve OTP from temporary storage
    const storedOTP = otpStore.get(email);
    if (!storedOTP || storedOTP !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // If OTP matches, remove it from the temporary storage
    otpStore.delete(email);

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    next(error);
  }
};
