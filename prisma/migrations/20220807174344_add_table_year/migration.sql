-- CreateTable
CREATE TABLE "Year" (
    "id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Year_id_key" ON "Year"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Year_year_key" ON "Year"("year");
