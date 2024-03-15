import { connectMongoDB } from "@/dbConfig/dbConfig";
import MyTask from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { userEmail, task } = await request.json();
  await connectMongoDB();
  await MyTask.create({ userEmail, task });
  return NextResponse.json({ message: "topic Created" }, { status: 201 });
}
