import { client } from "@/libs/client";
import styles from "./page.module.scss";
import Contents from "@/components/Contents";
import { Blog, DataList } from "@/types/type";
import PageNation from "@/components/PageNation";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const { page } = searchParams;
  const posts = await client.get<DataList<Blog>>({
    customRequestInit: { next: { tags: ["posts"] } },
    endpoint: "blogs",
    queries: {
      orders: "-publishDate",
      limit: 5,
      offset: page ? (Number(page) - 1) * 5 : 0,
    },
  });

  return (
    <div className={styles.wrapper}>
      {posts.contents.map((posts) => (
        <Contents content={posts} key={posts.id} />
      ))}
      <PageNation
        current={page ? Number(page) : 1}
        totalPage={Math.ceil(posts.totalCount / 5)}
      />
    </div>
  );
};

export default Page;
