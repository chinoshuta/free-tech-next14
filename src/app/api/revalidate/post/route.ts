import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: any) {
  console.log(req);
  revalidateTag("posts");
  revalidateTag(`post-${req?.contents?.new?.id}`);
  return new NextResponse("revalidate tag", { status: 200 });
}
