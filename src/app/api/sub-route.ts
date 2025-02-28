import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const newSub = await prisma.subscription.create({
    data: { email },
  });

  return NextResponse.json(newSub);
}
