import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/dbConfig/dbConfig";
import MyTask from "@/models/taskModel";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const { userID, task } = body;
  await connectMongoDB();
  await MyTask.findByIdAndUpdate(id, {
    userID,
    task,
  });
  return NextResponse.json({ message: "task update!" }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectMongoDB();
  await MyTask.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
