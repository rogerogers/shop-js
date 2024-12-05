-- CreateTable
CREATE TABLE "goods_alibaba_origin" (
    "id" SERIAL NOT NULL,
    "offer_id" BIGINT NOT NULL,
    "origin_list" TEXT NOT NULL,
    "origin_detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goods_alibaba_origin_pkey" PRIMARY KEY ("id")
);
