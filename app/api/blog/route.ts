import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("DataBase Connection Failed");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Posts created successfully", posts });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();
    await main();

    const post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: "Posts created successfully", post });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrongs" });
  } finally {
    await prisma.$disconnect();
  }
};
