import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

type Props = {
  totalPage: number;
  current: number;
};

const PageNation: React.FC<Props> = ({ totalPage, current }) => {
  return (
    <div className={styles.page}>
      {[...Array(totalPage)].map((_, i) =>
        current == i + 1 ? (
          <span className={styles.current} key={i}>
            {i + 1}
          </span>
        ) : (
          <Link href={`/?page=${i + 1}`} key={i}>
            <span className={styles.item}>{i + 1}</span>
          </Link>
        )
      )}
    </div>
  );
};

export default PageNation;
