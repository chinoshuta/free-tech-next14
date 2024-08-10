import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(_: NextRequest, { params }: { params: any }) {
  console.log(params);
  revalidateTag("posts");
  revalidateTag(`post-${params?.contents?.new?.id}`);
  return new NextResponse("revalidate tag", { status: 200 });
}
