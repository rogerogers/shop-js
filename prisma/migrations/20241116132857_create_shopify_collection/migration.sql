-- CreateTable
CREATE TABLE "shopify_collection" (
    "id" SERIAL NOT NULL,
    "shopify_collection_id" VARCHAR(80) NOT NULL,
    "handle" VARCHAR(80) NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "products_count" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "description_html" TEXT NOT NULL,
    "store_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shopify_collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shopify_collection" ADD CONSTRAINT "shopify_collection_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "third_store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
