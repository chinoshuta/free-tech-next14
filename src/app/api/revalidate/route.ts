import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const bodyBuffer = Buffer.from(bodyText, "utf-8");
  const params = JSON.parse(bodyText);

  const secret = process.env.MICROCMS_SECRET;
  if (!secret) {
    return new NextResponse("secret env is required", { status: 500 });
  }

  const signature = req.headers.get("X-MICROCMS-Signature");
  if (!signature) {
    return new NextResponse("signature header is required", { status: 400 });
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(bodyBuffer)
    .digest("hex");

  const isSignatureValid = timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!isSignatureValid)
    return new NextResponse("signature is invalid", { status: 400 });

  if (params.api === "blogs") {
    revalidateTag("posts");
    revalidateTag(`post-${params.contents?.new?.id}`);
    return new NextResponse("revalidate tag", { status: 200 });
  }
  if (params.api == "categories") {
    revalidateTag("categories");
    return new NextResponse("revalidate tag", { status: 200 });
  }
  return new NextResponse("invalid api", { status: 400 });
}
