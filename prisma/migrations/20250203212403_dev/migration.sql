-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePictureSrc" TEXT
);
INSERT INTO "new_User" ("id", "password", "profilePictureSrc", "username") SELECT "id", "password", "profilePictureSrc", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_profilePictureSrc_key" ON "User"("profilePictureSrc");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
