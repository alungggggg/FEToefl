import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = (await req.json()) as { token: string };

  (await cookies()).set("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    secure: true,
  });

  return NextResponse.json({ message: "success set cookie" });
}

export async function DELETE() {
  (await cookies()).delete("token");

  return NextResponse.json({ message: "success delete cookie" });
}

export async function GET() {
  const token = (await cookies()).get("token");

  return NextResponse.json({ token });
}
