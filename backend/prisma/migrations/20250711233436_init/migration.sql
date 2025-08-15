-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "deactivated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "content" VARCHAR(1000) NOT NULL,
    "is_edited" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" UUID NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMember" (
    "room_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "invited_by" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomMember_pkey" PRIMARY KEY ("room_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMember" ADD CONSTRAINT "RoomMember_invited_by_fkey" FOREIGN KEY ("invited_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
