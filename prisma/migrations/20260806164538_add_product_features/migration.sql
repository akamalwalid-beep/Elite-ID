-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "bestSeller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "rare" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "topRated" BOOLEAN NOT NULL DEFAULT false;
