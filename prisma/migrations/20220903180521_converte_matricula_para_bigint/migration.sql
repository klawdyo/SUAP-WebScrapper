/*
  Warnings:

  - You are about to alter the column `matricula` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "suapId" INTEGER,
    "matricula" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "image" TEXT NOT NULL,
    "shortName" TEXT,
    "campus" TEXT,
    "type" TEXT,
    "sector" TEXT,
    "occupation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("campus", "cpf", "createdAt", "email", "id", "image", "matricula", "name", "occupation", "sector", "shortName", "suapId", "type", "updatedAt") SELECT "campus", "cpf", "createdAt", "email", "id", "image", "matricula", "name", "occupation", "sector", "shortName", "suapId", "type", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_matricula_key" ON "User"("matricula");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
