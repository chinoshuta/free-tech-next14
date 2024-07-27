import { client } from "@/libs/client";
import styles from "./page.module.scss";
import Contents from "@/components/Contents";
import { Blog, Data } from "@/types/type";
import PageNation from "@/components/PageNation";
import { DateTime } from "luxon";

export default async function Home() {
  const blogs = await client.get<Data<Blog>>({ endpoint: "blogs" });
  return (
    <div className={styles.wrapper}>
      {blogs.contents.map((blog) => (
        <Contents content={blog} key={blog.id} />
      ))}
      <PageNation current={1} totalPage={Math.ceil(blogs.totalCount / 5)} />
    </div>
  );
}
