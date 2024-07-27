import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";

const SideMenu: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>プロフィール</p>
      <div className={styles.contents}>
        <Image
          src="/profile.jpg"
          className={styles.profileImg}
          width={80}
          height={80}
          alt="author"
        />
        <p className={styles.name}>shuta</p>
        <p>フリーランスのフロントエンドエンジニア</p>
        <p>
          React、React系のフレームワークを用いた開発をメインに行なっています
        </p>
        <div className={styles.iconWrapper}>
          <Link href="https://github.com/chinoshuta" target="_blank">
            <Image src="/github-icon.png" width={20} height={20} alt="github" />
          </Link>
        </div>
      </div>
      <p className={styles.title}>カテゴリ</p>
      <div className={styles.categoryWrapper}>
        {/* {allContentfulCategory?.nodes.map(
          (n) =>
            getCategoryLength(n.slug!) > 0 && (
              <OutboundLink
                className={styles.category}
                href={`/category/${n.slug}`}
                key={n.slug}
              >
                <>
                  {n.category}
                  {`(${getCategoryLength(n.slug!)})`}
                </>
              </OutboundLink>
            )
        )} */}
      </div>
    </div>
  );
};

export default SideMenu;
