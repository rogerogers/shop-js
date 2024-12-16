-- CreateTable
CREATE TABLE "alibaba_goods" (
    "id" SERIAL NOT NULL,
    "alibaba_offer_id" BIGINT NOT NULL,
    "seller_open_id" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alibaba_goods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alibaba_goods_alibaba_offer_id_key" ON "alibaba_goods"("alibaba_offer_id");
