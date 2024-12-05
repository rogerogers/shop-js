/*
  Warnings:

  - A unique constraint covering the columns `[alibaba_category_id]` on the table `alibaba_category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "alibaba_category_alibaba_category_id_key" ON "alibaba_category"("alibaba_category_id");

-- AddForeignKey
ALTER TABLE "alibaba_shopify_category_rel" ADD CONSTRAINT "alibaba_shopify_category_rel_alibaba_category_id_fkey" FOREIGN KEY ("alibaba_category_id") REFERENCES "alibaba_category"("alibaba_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alibaba_shopify_category_rel" ADD CONSTRAINT "alibaba_shopify_category_rel_shopify_category_id_fkey" FOREIGN KEY ("shopify_category_id") REFERENCES "shopify_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
