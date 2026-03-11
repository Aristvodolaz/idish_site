-- CreateTable
CREATE TABLE "dialogues" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ru" TEXT NOT NULL,
    "content_json" JSONB NOT NULL,
    "vocabulary_json" JSONB,
    "level" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dialogues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_dialogues" (
    "id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "dialogue_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "lesson_dialogues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lesson_dialogues_lesson_id_dialogue_id_key" ON "lesson_dialogues"("lesson_id", "dialogue_id");

-- AddForeignKey
ALTER TABLE "lesson_dialogues" ADD CONSTRAINT "lesson_dialogues_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_dialogues" ADD CONSTRAINT "lesson_dialogues_dialogue_id_fkey" FOREIGN KEY ("dialogue_id") REFERENCES "dialogues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
