import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const { password, firstName, lastName, ...rest } = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
      };
    });

    res.status(200).json(rest);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, firstName, lastName, email, password, bio, avatarUrl } =
    req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, firstName, lastName, email, password, bio, avatarUrl },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
