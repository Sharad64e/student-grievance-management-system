import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email, and password are required.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error('Email already registered. Please use another email.');
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required.');
    }

    const user = await User.findOne({ email });
    const passwordMatches = user ? await user.matchPassword(password) : false;

    if (!user || !passwordMatches) {
      res.status(401);
      throw new Error('Invalid login. Please check your email and password.');
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res) => {
  res.json({ user: req.user });
};
