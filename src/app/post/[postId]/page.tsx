import { client } from "@/libs/client";
import styles from "./page.module.scss";
import { Blog } from "@/types/type";
import { DateTime } from "luxon";

export type Params = {
  postId: string;
};

const PostPage = async ({ params }: { params: Params }) => {
  const content = await client.get<Blog>({
    endpoint: "blogs",
    contentId: params.postId,
  });
  console.log(content);
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{content.title}</h1>
        <div className={styles.note}>
          <div>
            {/* <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} /> */}
            {/* {data.contentfulBlogPost?.category?.map((n, i) => {
              return (
                <Link to={`/category/${n?.slug}`} className={styles.category}>
                  {n?.category}
                </Link>
              );
            })} */}
          </div>
          <div>
            {DateTime.fromJSDate(new Date(content.publishedAt)).toLocaleString(
              DateTime.DATE_MED_WITH_WEEKDAY
            )}
          </div>
        </div>
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{
            __html: content.content,
          }}
        />
      </div>
    </>
  );
};

export default PostPage;
