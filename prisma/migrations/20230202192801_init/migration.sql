-- CreateTable
CREATE TABLE "_TaskMention" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskMention_AB_unique" ON "_TaskMention"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskMention_B_index" ON "_TaskMention"("B");

-- AddForeignKey
ALTER TABLE "_TaskMention" ADD CONSTRAINT "_TaskMention_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskMention" ADD CONSTRAINT "_TaskMention_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
