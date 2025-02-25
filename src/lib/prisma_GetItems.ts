import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

export async function getItems() {
  try {
    const items = await prisma.item.findMany();
    return items;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}