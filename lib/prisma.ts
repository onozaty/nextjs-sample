import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// Next.js の開発サーバーはホットリロード時にモジュールを再読み込みするため、
// 何も対策しないと PrismaClient のインスタンスが大量に生成され DB コネクションが枯渇する。
// globalThis はホットリロードでもリセットされないため、ここにインスタンスを保持して
// シングルトンにすることで、コネクションの増殖を防ぐ。
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7 では PostgreSQL にドライバーアダプターが必須
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

// 既存のインスタンスがあれば再利用し、なければ新規作成
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// 開発環境のみ globalThis にキャッシュ（本番ではモジュール再読み込みが起きないため不要）
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
