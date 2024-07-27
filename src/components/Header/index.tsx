
import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className={styles.root}>
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
