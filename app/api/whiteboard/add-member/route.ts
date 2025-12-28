import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { boardId, email } = await req.json();

  if (!boardId || !email) {
    return NextResponse.json(
      { error: "Missing boardId or email" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingMember = await prisma.whiteBoardMember.findFirst({
    where: {
      whiteBoardId: boardId,
      userId: user.id,
    },
  });

  if (existingMember) {
    return NextResponse.json(
      { error: "User is already a member of this board" },
      { status: 400 }
    );
  }

  await prisma.whiteBoardMember.create({
    data: {
      whiteBoardId: boardId,
      userId: user.id,
      role: "MEMBER",
    },
  });

  return NextResponse.json(
    { message: "Member added successfully" },
    { status: 200 }
  );
};
