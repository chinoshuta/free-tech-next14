import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { Blog } from "@/types/type";
import { DateTime } from "luxon";

type Props = {
  content: Blog;
};

const Contents: React.FC<Props> = ({ content }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{content.title}</h1>
      <div className={styles.note}>
        <div>
          {/* <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} /> */}
          {/* {content.category} */}
        </div>
        <div>
          {DateTime.fromJSDate(
            new Date(content.publishedAt || "")
          ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </div>
      </div>
      <div className={styles.text}>{content.content}</div>
    </div>
  );
};

export default Contents;
