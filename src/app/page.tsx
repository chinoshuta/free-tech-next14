import { client } from "@/libs/client";
import styles from "./page.module.scss";
import Contents from "@/components/Contents";
import { Blog, DataList } from "@/types/type";
import PageNation from "@/components/PageNation";

export default async function Home() {
  const blogs = await client.get<DataList<Blog>>({ endpoint: "blogs" });
  return (
    <div className={styles.wrapper}>
      {blogs.contents.map((blog) => (
        <Contents content={blog} key={blog.id} />
      ))}
      <PageNation current={1} totalPage={Math.ceil(blogs.totalCount / 5)} />
    </div>
  );
}
