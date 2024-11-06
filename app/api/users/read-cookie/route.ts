import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  console.log("++++++++++++++++++++ STRONA PROFILU ++++++++++++++++++");
  console.log(
    "sprawdzam nowego cookies z cookies() ",
    cookies().get("myCookie")
  );
  console.log(
    "sprawdzam nowego cookies z request ",
    request.cookies.get("myCookie")?.value
  );
  console.log("czy to to?");
  const myCookieValue = cookies().get("myCookie");
  if (!myCookieValue) {
    return NextResponse.json(
      { error: "No refresh token found" },
      { status: 401 }
    );
  }

  return NextResponse.json({ myCookieValue });
}
