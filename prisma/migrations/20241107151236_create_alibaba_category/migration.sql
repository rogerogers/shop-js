-- CreateTable
CREATE TABLE "alibaba_category" (
    "id" SERIAL NOT NULL,
    "alibaba_category_id" INTEGER NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "parent_id" INTEGER NOT NULL DEFAULT 0,
    "is_leaf" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "alibaba_category_pkey" PRIMARY KEY ("id")
);
