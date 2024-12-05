-- CreateTable
CREATE TABLE "shopify_category" (
    "id" VARCHAR(80) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "parent_id" VARCHAR(80) NOT NULL,
    "version" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shopify_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopify_category_id_key" ON "shopify_category"("id");
