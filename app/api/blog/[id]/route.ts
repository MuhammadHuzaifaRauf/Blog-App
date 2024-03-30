import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/prisma";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    if (!post) {
      return NextResponse.json({ message: "Something went wrong" });
    }
    if (post) {
      return NextResponse.json({ message: "Success", post });
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id: id },
    });
    return NextResponse.json({ message: "Success", post });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error });
  } finally {
    await prisma.$disconnect();
  }
};
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();

    const post = await prisma.post.delete({ where: { id: id } });

    return NextResponse.json({ message: "Success", post });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error });
  } finally {
    await prisma.$disconnect();
  }
};
