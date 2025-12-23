-- CreateTable
CREATE TABLE "WhiteBoard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhiteBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteBoardMember" (
    "id" TEXT NOT NULL,
    "whiteBoardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "WhiteBoardMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WhiteBoardMember_userId_idx" ON "WhiteBoardMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteBoardMember_whiteBoardId_userId_key" ON "WhiteBoardMember"("whiteBoardId", "userId");

-- AddForeignKey
ALTER TABLE "WhiteBoard" ADD CONSTRAINT "WhiteBoard_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteBoardMember" ADD CONSTRAINT "WhiteBoardMember_whiteBoardId_fkey" FOREIGN KEY ("whiteBoardId") REFERENCES "WhiteBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteBoardMember" ADD CONSTRAINT "WhiteBoardMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
