import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  _: NextRequest,
  { params }: { params: { tag: string } }
) {
  const { tag } = params;
  if (!tag) return new NextResponse("params tag required", { status: 500 });

  revalidateTag(tag);
  return new NextResponse("revalidate tag", { status: 200 });
}
