import { client } from "@/libs/client";
import styles from "../page.module.scss";
import { Blog, DataList } from "@/types/type";
import { getFormatDateString } from "@/helpers/util";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { redirect } from "next/navigation";

export const generateStaticParams = async () => {
  const posts = await client.get<DataList<Blog>>({
    endpoint: "blogs",
    queries: {
      orders: "-publishDate",
    },
  });
  return posts?.contents?.map((post) => ({ slug: post.id }));
};

export type Params = {
  postId: string;
};

const PostPage = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { draftKey } = searchParams;
  if (!draftKey) redirect(`/post/${params.postId}`);
  const content = await client.get<Blog>({
    endpoint: "blogs",
    contentId: params.postId,
    queries: {
      draftKey: draftKey as string,
    },
    customRequestInit: { next: { tags: [`post-${params.postId}`] } },
  });

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{content.title}</h1>
        <div className={styles.note}>
          <div>
            <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} />
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
        <div
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
