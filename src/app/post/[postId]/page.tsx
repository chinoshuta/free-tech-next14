import { client } from "@/libs/client";
import styles from "./page.module.scss";
import { Blog } from "@/types/type";
import { getFormatDateString } from "@/helpers/util";
import Link from "next/link";

export type Params = {
  postId: string;
};

const PostPage = async ({ params }: { params: Params }) => {
  const content = await client.get<Blog>({
    endpoint: "blogs",
    contentId: params.postId,
    customRequestInit: { cache: "no-store" },
  });

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{content.title}</h1>
        <div className={styles.note}>
          <div>
            {/* <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} /> */}
            {content.categories?.map((category, i) => {
              return (
                <Link
                  href={`/category/${category.id}`}
                  className={styles.category}
                  key={category.id}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
          <div>{getFormatDateString(content.publishDate)}</div>
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
