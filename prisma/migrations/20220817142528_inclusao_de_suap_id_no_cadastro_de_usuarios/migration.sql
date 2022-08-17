/*
  Warnings:

  - Added the required column `suapId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "suapId" INTEGER NOT NULL,
    "matricula" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "image" TEXT NOT NULL,
    "shortName" TEXT,
    "campus" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("campus", "cpf", "createdAt", "email", "id", "image", "matricula", "name", "shortName", "updatedAt") SELECT "campus", "cpf", "createdAt", "email", "id", "image", "matricula", "name", "shortName", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_suapId_key" ON "User"("suapId");
CREATE UNIQUE INDEX "User_matricula_key" ON "User"("matricula");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
