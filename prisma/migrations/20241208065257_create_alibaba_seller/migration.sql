-- CreateTable
CREATE TABLE "alibaba_seller" (
    "id" SERIAL NOT NULL,
    "commany_name" VARCHAR(80) NOT NULL,
    "seller_user_id" INTEGER NOT NULL,
    "seller_member_id" VARCHAR(80) NOT NULL,
    "seller_open_id" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alibaba_seller_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alibaba_seller_seller_open_id_key" ON "alibaba_seller"("seller_open_id");
