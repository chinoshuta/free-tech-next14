"use client";

import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import clsx from "clsx";

const Header: React.FC = () => {
  const [isHeaderHide, seIsHeaderHide] = React.useState<boolean>(false);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y >= 0) {
      seIsHeaderHide(false);
      return;
    }
    if (prevPos.y > currPos.y) {
      // 下スクロールの場合はヘッダー非表示
      seIsHeaderHide(true);
      return;
    }
    seIsHeaderHide(false);
  }, []);

  return (
    <header className={clsx(styles.root, isHeaderHide && styles.hidden)}>
      <div className={styles.wrapper}>
        <Link href="/">
          <h1 className={styles.title}>free 技術log</h1>
        </Link>
        <div className={styles.menu}>
          <Link href="/about">
            <li>当ブログについて</li>
          </Link>
          {/* <li>お問い合せ</li> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
