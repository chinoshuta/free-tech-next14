import { client } from "@/libs/client";
import { Blog, DataList } from "@/types/type";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryIds = await client.getAllContentIds({
    customRequestInit: { next: { tags: ["posts"] } },
    endpoint: "blogs",
  });
  const categoriesSitemap: MetadataRoute.Sitemap = categoryIds.map((id) => ({
    url: `https://free-tech.biz/category/${id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
  }));
  const posts = await client.getAllContents<DataList<Blog>>({
    customRequestInit: { next: { tags: ["posts"] } },
    endpoint: "blogs",
  });
  const postsSitemap: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://free-tech.biz/post/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "never",
  }));

  return [
    {
      url: "https://free-tech.biz/",
      lastModified: new Date(),
      changeFrequency: "daily",
    },
    {
      url: "https://free-tech.biz/about/",
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    ...categoriesSitemap,
    ...postsSitemap,
  ];
}
