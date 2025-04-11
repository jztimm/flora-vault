import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    const publicUsers = users.map(({ id, username, bio, avatarUrl }) => ({
      id,
      username,
      bio,
      avatarUrl,
    }));

    res.status(200).json(publicUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET a user by ID
export const getCurrentUser = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT update a user
export const updateUser = async (req, res) => {
  const { id } = req.user;
  const { username, firstName, lastName, email, bio, avatarUrl, password } =
    req.body;

  try {
    const dataToUpdate = {
      username,
      firstName,
      lastName,
      email,
      bio,
      avatarUrl,
    };

    if (password && password.trim() !== "") {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    const { password: _password, ...userWithoutPassword } = updatedUser;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE a user
export const deleteUser = async (req, res) => {
  const { id } = req.user;

  try {
    await prisma.user.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "User account successfully deleted." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
