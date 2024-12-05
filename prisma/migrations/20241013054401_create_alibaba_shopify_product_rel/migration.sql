-- CreateTable
CREATE TABLE "alibaba_shopify_product_rel" (
    "id" SERIAL NOT NULL,
    "alibaba_offer_id" BIGINT NOT NULL,
    "shopify_product_id" VARCHAR(80) NOT NULL,
    "sync_status" SMALLINT NOT NULL DEFAULT 0,
    "last_sync_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "store_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alibaba_shopify_product_rel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "alibaba_shopify_product_rel_alibaba_offer_id_idx" ON "alibaba_shopify_product_rel"("alibaba_offer_id");

-- CreateIndex
CREATE INDEX "alibaba_shopify_product_rel_shopify_product_id_idx" ON "alibaba_shopify_product_rel"("shopify_product_id");

-- CreateIndex
CREATE UNIQUE INDEX "alibaba_shopify_product_rel_alibaba_offer_id_shopify_produc_key" ON "alibaba_shopify_product_rel"("alibaba_offer_id", "shopify_product_id");

-- AddForeignKey
ALTER TABLE "alibaba_shopify_product_rel" ADD CONSTRAINT "alibaba_shopify_product_rel_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
