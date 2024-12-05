-- CreateTable
CREATE TABLE "shopify_metafield" (
    "id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "shopify_product_id" VARCHAR(80) NOT NULL,
    "shopify_metafield_id" VARCHAR(80) NOT NULL,
    "namespace" VARCHAR(255) NOT NULL,
    "key" VARCHAR(64) NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "owner_type" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shopify_metafield_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopify_metafield_store_id_shopify_product_id_owner_type_na_key" ON "shopify_metafield"("store_id", "shopify_product_id", "owner_type", "namespace", "key");

-- AddForeignKey
ALTER TABLE "shopify_metafield" ADD CONSTRAINT "shopify_metafield_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
