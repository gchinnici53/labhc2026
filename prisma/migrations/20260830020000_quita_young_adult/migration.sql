-- AlterEnum
BEGIN;
CREATE TYPE "Division_new" AS ENUM ('CUB', 'JUNIOR', 'ADULT', 'VETERAN', 'SENIOR');
ALTER TABLE "Arquero" ALTER COLUMN "division" TYPE "Division_new" USING ("division"::text::"Division_new");
ALTER TYPE "Division" RENAME TO "Division_old";
ALTER TYPE "Division_new" RENAME TO "Division";
DROP TYPE "public"."Division_old";
COMMIT;
