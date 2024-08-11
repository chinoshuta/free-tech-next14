import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const params = await req.json();
  console.log(params);
  req.formData;
  revalidateTag("posts");
  //revalidateTag(`post-${req.body?..contents?.new?.id}`);
  return new NextResponse("revalidate tag", { status: 200 });
}
