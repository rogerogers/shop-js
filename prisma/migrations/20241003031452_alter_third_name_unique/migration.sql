/*
  Warnings:

  - A unique constraint covering the columns `[platform_id,name]` on the table `third_application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `third_platform` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `third_store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[app_id,name]` on the table `third_store` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "third_application_platform_id_name_key" ON "third_application"("platform_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "third_platform_name_key" ON "third_platform"("name");

-- CreateIndex
CREATE UNIQUE INDEX "third_store_name_key" ON "third_store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "third_store_app_id_name_key" ON "third_store"("app_id", "name");
