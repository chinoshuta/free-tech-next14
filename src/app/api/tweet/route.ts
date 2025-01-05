import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { Blog, Category, WebHookParams } from "@/types/type";
import { Arapey } from "next/font/google";
import { TwitterApi } from "twitter-api-v2";

const isFromBlogs = (
  params: WebHookParams<any>
): params is WebHookParams<Blog> => {
  return params.api === "blogs";
};

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
  if (!isFromBlogs(params) || params.contents.old) {
    return new NextResponse("invalid api", { status: 400 });
  }
  const appOnlyClient = new TwitterApi(process.env.TWITTER_BARER_TOKEN ?? "");
  appOnlyClient.v2.tweet(
    `ブログを投稿しました。「${params.contents.new.publishValue.title}」https://free-tech.biz/post${params.contents.new.publishValue.id}`
  );
}
