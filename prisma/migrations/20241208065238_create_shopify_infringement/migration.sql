-- CreateTable
CREATE TABLE "shopify_infringement" (
    "id" SERIAL NOT NULL,
    "word" VARCHAR(80) NOT NULL,
    "replacement" VARCHAR(80) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "shopify_infringement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shopify_infringement_word_idx" ON "shopify_infringement"("word");
