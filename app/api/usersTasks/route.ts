import { connectMongoDB } from "@/dbConfig/dbConfig";
import MyTask from "@/models/taskModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: any) {
  const { userID, task } = await request.json();
  await connectMongoDB();
  await MyTask.create({ userID, task });
  return NextResponse.json({ message: "topic Created" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const userID = request.nextUrl.searchParams.get("userID");
  await connectMongoDB();
  const task = await MyTask.find({ userID });
  return NextResponse.json({ myTasks: task }, { status: 200 });
}
