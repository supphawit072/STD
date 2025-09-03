import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
    };
export const prisma = 
    globalForPrisma.prisma ?? 
    new PrismaClient({ 
    log: ['query'], // log การ query เพื่อดูวาเกิดอะไรขึ้นบาง 
  })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 
