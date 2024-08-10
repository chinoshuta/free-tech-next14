import { client } from "@/libs/client";
import styles from "./page.module.scss";
import Contents from "@/components/Contents";
import { Blog, DataList } from "@/types/type";
import PageNation from "@/components/PageNation";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const { page } = searchParams;
  const blogs = await client.get<DataList<Blog>>({
    //customRequestInit: { cache: "no-store" },
    endpoint: "blogs",
    queries: {
      orders: "-publishDate",
      limit: 5,
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
