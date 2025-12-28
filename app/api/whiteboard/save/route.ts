import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { elements, whiteBoardId } = await req.json();

  if (!whiteBoardId || typeof whiteBoardId !== "string") {
    return NextResponse.json(
      { error: "Invalid whiteBoardId" },
      { status: 400 }
    );
  }

  const whiteBoard = await prisma.whiteBoard.findUnique({
    where: {
      id: whiteBoardId,
    },
  });

  if (!whiteBoard) {
    return NextResponse.json(
      { error: "Whiteboard not found" },
      { status: 404 }
    );
  }

  await prisma.whiteBoard.update({
    where: {
      id: whiteBoardId,
    },
    data: {
      contents: elements,
    },
  });
  return NextResponse.json(
    { message: "Whiteboard saved successfully" },
    { status: 200 }
  );
};
