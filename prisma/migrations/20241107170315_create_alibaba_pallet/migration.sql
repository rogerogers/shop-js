-- CreateTable
CREATE TABLE "alibaba_pallet" (
    "id" SERIAL NOT NULL,
    "alibaba_pallet_id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alibaba_pallet_pkey" PRIMARY KEY ("id")
);
