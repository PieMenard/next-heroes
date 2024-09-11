-- CreateTable
CREATE TABLE "Power" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dangeorus" BOOLEAN NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HeroPowers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HeroPowers_AB_unique" ON "_HeroPowers"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroPowers_B_index" ON "_HeroPowers"("B");

-- AddForeignKey
ALTER TABLE "_HeroPowers" ADD CONSTRAINT "_HeroPowers_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroPowers" ADD CONSTRAINT "_HeroPowers_B_fkey" FOREIGN KEY ("B") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;
