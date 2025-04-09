// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding mock users...");

  await prisma.user.deleteMany(); // Clear existing users

  const users = [
    {
      username: "greenwitch",
      firstName: "Rowan",
      lastName: "Sage",
      email: "rowan.sage@floralwitchery.com",
      password: "herbal123",
      bio: "Herbalist and garden witch specializing in culinary and healing herbs.",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      joinedAt: new Date("2024-08-14"),
    },
    {
      username: "fungifolk",
      firstName: "Theo",
      lastName: "Myco",
      email: "theo.myco@mycoforest.org",
      password: "mushlove",
      bio: "Mushroom forager and eastern herbal medicine enthusiast.",
      avatarUrl: "https://i.pravatar.cc/150?img=22",
      joinedAt: new Date("2024-10-01"),
    },
    {
      username: "aromaleaf",
      firstName: "Selena",
      lastName: "Hart",
      email: "selena.hart@aromaleaf.co",
      password: "teabloom",
      bio: "Tea grower and wildflower collector with a love for aromatic species.",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      joinedAt: new Date("2025-01-02"),
    },
    {
      username: "medicinalroots",
      firstName: "Diego",
      lastName: "Ramos",
      email: "diego.ramos@rootsremedy.lat",
      password: "rootedHealing",
      bio: "Preserving indigenous plant medicine across Latin America.",
      avatarUrl: "https://i.pravatar.cc/150?img=9",
      joinedAt: new Date("2025-01-18"),
    },
    {
      username: "emptyroots",
      firstName: "Nova",
      lastName: "Lin",
      email: "nova.lin@plantjournal.space",
      password: "plantbeginner",
      bio: "Just getting started with plant journaling 🌱",
      avatarUrl: "https://i.pravatar.cc/150?img=30",
      joinedAt: new Date("2025-03-01"),
    },
    {
      username: "test",
      firstName: "Testy",
      lastName: "McTestface",
      email: "testy.mctestface@floralvault.dev",
      password: "Test2025",
      bio: "This is a test user account for local dev.",
      avatarUrl: "https://i.pravatar.cc/150?img=33",
      joinedAt: new Date("2025-04-05"),
    },
    {
      username: "jominime",
      firstName: "Jane",
      lastName: "Smith",
      email: "jomi@test.com",
      password: "Test2025",
      bio: "I love spending time in the garden and watching things grow. Fig trees are my favorite, and I enjoy learning how to care for them along with other fruits and herbs. Homesteading gives me a sense of peace and purpose, and I’m always finding new ways to make the most of what I grow. Whether it’s planting something new or just enjoying the quiet outside, I’m happiest with my hands in the soil.",
      avatarUrl:
        "https://static.myfigurecollection.net/upload/users/200/216069_1617412905.jpeg",
      joinedAt: new Date("2025-04-05"),
    },
  ];

  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );

  await prisma.user.createMany({ data: hashedUsers });

  console.log("✅ Mock users seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding users:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
