-- CreateTable
CREATE TABLE "shopify_product" (
    "id" SERIAL NOT NULL,
    "shopify_product_id" VARCHAR(80) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "handle" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "description_html" TEXT NOT NULL,
    "media_count" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shopify_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopify_product_store_id_shopify_product_id_key" ON "shopify_product"("store_id", "shopify_product_id");

-- AddForeignKey
ALTER TABLE "shopify_product" ADD CONSTRAINT "shopify_product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
