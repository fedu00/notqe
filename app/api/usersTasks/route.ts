import { connectMongoDB } from "@/dbConfig/dbConfig";
import MyTask from "@/models/taskModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: any) {
  const { userEmail, task } = await request.json();
  await connectMongoDB();
  await MyTask.create({ userEmail, task });
  return NextResponse.json({ message: "topic Created" }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const userEmail = request.nextUrl.searchParams.get("email");
  await connectMongoDB();
  const task = await MyTask.find({ userEmail });
  return NextResponse.json({ myTasks: task }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await MyTask.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();
  const { userEmail, task } = body;
  await connectMongoDB();
  await MyTask.findByIdAndUpdate(id, {
    userEmail,
    task,
  });
  return NextResponse.json({ message: "task update!" }, { status: 200 });
}
