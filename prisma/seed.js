const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: "admin@aocmi.com" } });
  if (!existing) {
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@aocmi.com",
        password: await bcrypt.hash("password", 10),
        isSuperAdmin: true,
      },
    });
    console.log("Super admin created: admin@aocmi.com / password");
  }

  const woty = await prisma.wordOfTheYear.findFirst();
  if (!woty) {
    await prisma.wordOfTheYear.create({
      data: {
        title: "Grace, Mercy and Peace",
        img: "word-of-the-year-2026.jpg",
        description: "This is our prophetic declaration for the year. We walk in the fullness of God's grace, mercy, and peace in every area of our lives.",
      },
    });
    console.log("Word of the year placeholder created.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
