import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const prisma = new PrismaClient();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = generateToken(user.id);

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          avatarUrl: user.avatarUrl,
          essence: user.essence,
        },
      });
    }
  } catch (error) {
    console.error("Error logging in user: ", error);
    res.status(500).json({ message: "Failed to login user" });
  }
};

// POST create a new user
export const registerUser = async (req, res) => {
  const { username, firstName, lastName, email, password, bio, avatarUrl } =
    req.body;

  const existingUserEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const existingUserUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUserEmail) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  if (existingUserUsername) {
    return res.status(409).json({ message: "Username is already taken" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        bio,
        avatarUrl,
        essence: user.essence,
        joinedAt: new Date(),
      },
    });

    const token = generateToken(newUser.id);

    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        bio: newUser.bio,
        avatarUrl: newUser.avatarUrl,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};
