-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ALTER COLUMN "customerName" DROP NOT NULL,
ALTER COLUMN "customerEmail" DROP NOT NULL;
