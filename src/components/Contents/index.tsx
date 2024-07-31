import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { Blog } from "@/types/type";
import { getFormatDateString } from "@/helpers/util";

type Props = {
  content: Blog;
};

const Contents: React.FC<Props> = ({ content }) => {
  const text = content.content.match(/[^\<\>]+(?=\<[^\<\>]+\>)|[^\<\>]+$/g);

  return (
    <Link href={`/post/${content.id}`}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{content.title}</h1>
        <div className={styles.note}>
          <div>
            {content.categories?.map((category, index) =>
              index > 0 ? `,${category.name}` : category.name
            )}
            {/* <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} /> */}
          </div>
          <div>{getFormatDateString(content.publishDate)}</div>
        </div>
        <div className={styles.text}>{text}</div>
      </div>
    </Link>
  );
};

export default Contents;
