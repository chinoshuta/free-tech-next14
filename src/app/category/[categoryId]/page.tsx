import { client } from "@/libs/client";
import styles from "./page.module.scss";
import Contents from "@/components/Contents";
import { Blog, Category, DataList } from "@/types/type";
import PageNation from "@/components/PageNation";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  const categories = await client.get<DataList<Category>>({
    endpoint: "categories",
    queries: {
      orders: "-publishDate",
    },
  });
  return categories?.contents?.map((category) => ({ slug: category.id }));
};

export type Params = {
  categoryId: string;
  page?: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const content = await client.get<Category>({
    endpoint: "categories",
    contentId: params.categoryId,
    customRequestInit: { next: { tags: [`category-${params.categoryId}`] } },
  });
  return {
    title: `カテゴリ：${content.name} - free技術log`,
  };
};

const Page = async ({ params }: { params: Params }) => {
  const { page, categoryId } = params;
  const blogs = await client.get<DataList<Blog>>({
    customRequestInit: { next: { tags: ["posts"] } },
    endpoint: "blogs",
    queries: {
      orders: "-publishDate",
      limit: 5,
      filters: `categories[contains]${categoryId}`,
      offset: page ? (Number(page) - 1) * 5 : 0,
    },
  });
  return (
    <div className={styles.wrapper}>
      {blogs.contents.map((blog) => (
        <Contents content={blog} key={blog.id} />
      ))}
      <PageNation
        current={page ? Number(page) : 1}
        totalPage={Math.ceil(blogs.totalCount / 5)}
      />
    </div>
  );
};

export default Page;
