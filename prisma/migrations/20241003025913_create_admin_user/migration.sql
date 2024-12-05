-- CreateTable
CREATE TABLE "admin_user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "email" VARCHAR(50) NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "image" TEXT,
    "deleted_at" TIMESTAMP(3),
    "expired_at" TIMESTAMP(3),
    "password" VARCHAR(100),
    "password_authentication" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_email_key" ON "admin_user"("email");
