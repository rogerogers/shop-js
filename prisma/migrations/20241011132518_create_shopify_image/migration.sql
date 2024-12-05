-- CreateTable
CREATE TABLE "shopify_image" (
    "id" SERIAL NOT NULL,
    "shopify_product_id" VARCHAR(80) NOT NULL,
    "shopify_media_id" VARCHAR(80) NOT NULL,
    "src" VARCHAR(255),
    "origin_src" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "shopify_image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shopify_image_store_id_shopify_product_id_shopify_media_id_idx" ON "shopify_image"("store_id", "shopify_product_id", "shopify_media_id");

-- AddForeignKey
ALTER TABLE "shopify_image" ADD CONSTRAINT "shopify_image_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
