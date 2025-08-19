// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1) ユーザー2人
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: '管理者',
      email: 'admin@example.com',
      passwordHash: 'dummyhash',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      username: 'ユーザー2',
      email: 'user2@example.com',
      passwordHash: 'dummyhash2',
    },
  });

  // 2) ルーム（なければ作成）
  const room =
    (await prisma.room.findFirst({ where: { name: 'テストルーム' } })) ??
    (await prisma.room.create({
      data: { name: 'テストルーム', createdBy: adminUser.id },
    }));

  // 3) ルームメンバー（ADMIN / MEMBER）
  //   ※ (roomId,userId) にユニーク制約があるなら createMany+skipDuplicates でもOK
  await prisma.roomMember.upsert({
    where: { roomId_userId: { roomId: room.id, userId: adminUser.id } }, // ない場合は適宜変更
    update: {},
    create: {
      roomId: room.id,
      userId: adminUser.id,
      role: 'ADMIN',
      invitedBy: null,
    },
  });
  await prisma.roomMember.upsert({
    where: { roomId_userId: { roomId: room.id, userId: user2.id } },
    update: {},
    create: {
      roomId: room.id,
      userId: user2.id,
      role: 'MEMBER',
      invitedBy: adminUser.id,
    },
  });

  // 4) 初期メッセージ（相手＝user2 の発言も入れる）
  //    何度もseedして重複したくない場合は一旦 deleteMany するか、already-exists チェックを入れる
  await prisma.message.createMany({
    data: [
      {
        userId: user2.id,
        roomId: room.id,
        content: 'こんにちは、管理者さん！',
      },
      {
        userId: adminUser.id,
        roomId: room.id,
        content: 'ようこそ、ユーザー2！',
      },
    ],
    skipDuplicates: true, // content に一意制約が無ければ効果なし。気になるなら find→create に。
  });

  console.log('✅ Seed 完了');
  console.log({ roomId: room.id, adminId: adminUser.id, user2Id: user2.id });
}

main()
  .catch((e) => {
    console.error('❌ Seed エラー:', e);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
