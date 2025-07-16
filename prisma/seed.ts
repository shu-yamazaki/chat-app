import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 管理者ユーザー作成
  const adminUser = await prisma.user.create({
    data: {
      username: '管理者',
      email: 'admin@example.com',
      passwordHash: 'dummyhash',
    },
  });

  // ルーム作成
  const room = await prisma.room.create({
    data: {
      name: 'テストルーム',
      createdBy: adminUser.id,
    },
  });

  // ルームメンバー登録（ADMINとして）
  await prisma.roomMember.create({
    data: {
      roomId: room.id,
      userId: adminUser.id,
      role: 'ADMIN',
      invitedBy: null,
    },
  });

  // メッセージ投稿
  await prisma.message.create({
    data: {
      userId: adminUser.id,
      roomId: room.id,
      content: 'これはテストメッセージです。',
    },
  });

  console.log('✅ Seed 完了');
}

void (async () => {
  try {
    await main();
  } catch (e) {
    console.error('❌ Seed エラー:', e);
  } finally {
    await prisma.$disconnect();
  }
})();
