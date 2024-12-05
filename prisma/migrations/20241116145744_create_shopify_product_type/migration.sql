-- CreateTable
CREATE TABLE "shopify_product_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "store_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shopify_product_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shopify_product_type_store_id_name_idx" ON "shopify_product_type"("store_id", "name");

-- AddForeignKey
ALTER TABLE "shopify_product_type" ADD CONSTRAINT "shopify_product_type_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
