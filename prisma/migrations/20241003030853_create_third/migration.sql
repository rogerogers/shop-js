-- CreateTable
CREATE TABLE "third_platform" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "logo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "third_platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "third_application" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "app_key" VARCHAR(100),
    "app_secret" VARCHAR(100),
    "scope" TEXT,
    "callback_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "platform_id" INTEGER NOT NULL,

    CONSTRAINT "third_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "third_store" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "store_url" VARCHAR(100),
    "token" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "app_id" INTEGER NOT NULL,

    CONSTRAINT "third_store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "third_application" ADD CONSTRAINT "third_application_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "third_platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "third_store" ADD CONSTRAINT "third_store_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "third_application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
