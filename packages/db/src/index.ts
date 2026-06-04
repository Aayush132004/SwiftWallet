import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import path from "path";

// 🚀 1. Load the environment variables IMMEDIATELY before anything else runs.
// process.cwd() points to the root of the app running this code (e.g., /apps/banks-webhook).
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// 2. Initialize the Postgres Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

// 3. Prevent creating duplicate Prisma connections during Next.js/Express hot-reloads
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;