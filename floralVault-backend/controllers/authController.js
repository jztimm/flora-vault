import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("User: ", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.status(200).json({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
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
        joinedAt: new Date(),
      },
    });

    const { password: _password, ...userWithoutPassword } = newUser;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};
