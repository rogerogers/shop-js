-- CreateTable
CREATE TABLE "shopify_tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "shopify_tag_type" TEXT NOT NULL,
    "store_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shopify_tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shopify_tag_store_id_shopify_tag_type_name_idx" ON "shopify_tag"("store_id", "shopify_tag_type", "name");

-- AddForeignKey
ALTER TABLE "shopify_tag" ADD CONSTRAINT "shopify_tag_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
