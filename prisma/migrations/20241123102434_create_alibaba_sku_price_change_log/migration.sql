-- AlterTable
ALTER TABLE "shopify_product" ADD COLUMN     "tags" TEXT[];

-- CreateTable
CREATE TABLE "alibaba_sku_price_change_log" (
    "id" SERIAL NOT NULL,
    "alibaba_sku_id" BIGINT NOT NULL,
    "before" DECIMAL(10,2) NOT NULL,
    "after" DECIMAL(10,2) NOT NULL,
    "changed" DECIMAL(10,2) NOT NULL,
    "change_type" SMALLINT NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alibaba_sku_price_change_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alibaba_sku_price_change_log_date_alibaba_sku_id_key" ON "alibaba_sku_price_change_log"("date", "alibaba_sku_id");
