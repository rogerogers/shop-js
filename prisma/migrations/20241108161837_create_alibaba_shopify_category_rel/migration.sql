-- CreateTable
CREATE TABLE "alibaba_shopify_category_rel" (
    "alibaba_category_id" INTEGER NOT NULL,
    "shopify_category_id" TEXT NOT NULL,

    CONSTRAINT "alibaba_shopify_category_rel_pkey" PRIMARY KEY ("alibaba_category_id","shopify_category_id")
);
