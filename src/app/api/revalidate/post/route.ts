import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const params = await req.json();
  revalidateTag("posts");
  revalidateTag(`post-${params.contents?.new?.id}`);
  return new NextResponse("revalidate tag", { status: 200 });
}
