-- CreateTable
CREATE TABLE "alibaba_goods_status_change_log" (
    "id" SERIAL NOT NULL,
    "alibaba_offer_id" BIGINT NOT NULL,
    "before" VARCHAR(20) NOT NULL,
    "after" VARCHAR(20) NOT NULL,
    "change_type" SMALLINT NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alibaba_goods_status_change_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alibaba_goods_status_change_log_date_alibaba_offer_id_key" ON "alibaba_goods_status_change_log"("date", "alibaba_offer_id");
