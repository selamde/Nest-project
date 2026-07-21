/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `applicant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "applicant_phone_key" ON "applicant"("phone");
