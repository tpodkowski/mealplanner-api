/*
  Warnings:

  - You are about to drop the `_ProductToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[name]` on the table `Product`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "_ProductToRecipe" DROP CONSTRAINT "_ProductToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToRecipe" DROP CONSTRAINT "_ProductToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "units" TEXT;

-- CreateTable
CREATE TABLE "RecipeProducts" (
    "productId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("productId","recipeId")
);

-- DropTable
DROP TABLE "_ProductToRecipe";

-- CreateIndex
CREATE UNIQUE INDEX "Product.name_unique" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "RecipeProducts" ADD FOREIGN KEY("productId")REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeProducts" ADD FOREIGN KEY("recipeId")REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
