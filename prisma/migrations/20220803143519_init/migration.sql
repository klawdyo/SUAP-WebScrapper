-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matricula" INTEGER,
    "email" TEXT,
    "name" TEXT,
    "image" TEXT
);
INSERT INTO "new_User" ("email", "id", "image", "matricula", "name") SELECT "email", "id", "image", "matricula", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
