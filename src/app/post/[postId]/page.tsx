import { client } from "@/libs/client";
import styles from "./page.module.scss";
import { Blog, DataList } from "@/types/type";
import { getFormatDateString } from "@/helpers/util";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { NotFound } from "@/app/not-found";
import type { Metadata } from "next";

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

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const content = await client.get<Blog>({
    endpoint: "blogs",
    contentId: params.postId,
    customRequestInit: { next: { tags: [`post-${params.postId}`] } },
  });
  return {
    title: `${content.title} - free技術log`,
  };
};

const PostPage = async ({ params }: { params: Params }) => {
  try {
    const content = await client.get<Blog>({
      endpoint: "blogs",
      contentId: params.postId,
      customRequestInit: { next: { tags: [`post-${params.postId}`] } },
    });

    return (
      <>
        <article className={styles.wrapper}>
          <h1 className={styles.title}>{content.title}</h1>
          <div className={styles.note}>
            <nav>
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
            </nav>
            <div>{getFormatDateString(content.publishDate)}</div>
          </div>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: content.content,
            }}
          />
        </article>
      </>
    );
  } catch {
    return <NotFound />;
  }
};

export default PostPage;
