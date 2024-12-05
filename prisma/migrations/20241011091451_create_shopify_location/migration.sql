-- CreateTable
CREATE TABLE "shopify_location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "store_id" INTEGER NOT NULL,
    "activatable" BOOLEAN NOT NULL,
    "is_primary" BOOLEAN NOT NULL,
    "shopify_location_id" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shopify_location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopify_location_store_id_shopify_location_id_key" ON "shopify_location"("store_id", "shopify_location_id");

-- AddForeignKey
ALTER TABLE "shopify_location" ADD CONSTRAINT "shopify_location_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
