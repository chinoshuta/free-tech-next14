import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST() {
  revalidateTag("categories");
  return new NextResponse("revalidate tag", { status: 200 });
}
