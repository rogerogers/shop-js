-- CreateTable
CREATE TABLE "shopify_publication" (
    "id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "shopify_publication_id" VARCHAR(80) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shopify_publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopify_publication_store_id_shopify_publication_id_key" ON "shopify_publication"("store_id", "shopify_publication_id");

-- AddForeignKey
ALTER TABLE "shopify_publication" ADD CONSTRAINT "shopify_publication_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
