import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/libs/client";
import { Blog, Category, DataList } from "@/types/type";

type CategoryWithPostCount = {
  category: Category;
  postCount: number;
};

const SideMenu: React.FC = async () => {
  const categories = await client.get<DataList<Category>>({
    customRequestInit: { next: { tags: ["categories"] } },
    endpoint: "categories",
  });

  const categoriesWithPostCount: CategoryWithPostCount[] = await Promise.all(
    categories?.contents.map(async (category) => {
      const blogs = await client.get<DataList<Blog>>({
        customRequestInit: {
          next: { tags: ["categories", `category-${category.id}`] },
        },
        endpoint: "blogs",
        queries: {
          filters: `categories[contains]${category.id}`,
        },
      });
      return {
        category,
        postCount: blogs.totalCount,
      };
    })
  );

  return (
    <aside className={styles.wrapper}>
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
        <p>フリーランスエンジニア</p>
        <p>
          React、React系のフレームワークを用いた開発をメインに行なっています
        </p>
        <div className={styles.iconWrapper}>
          <Link href="https://linktr.ee/shutachino" target="_blank">
            <Image
              src="/linktree-icon.webp"
              width={25}
              height={25}
              alt="linktree"
            />
          </Link>
          {/* <Link href="https://github.com/chinoshuta" target="_blank">
            <Image src="/github-icon.png" width={20} height={20} alt="github" />
          </Link>
          <Link href="https://qiita.com/chinoshuta" target="_blank">
            <Image src="/qiita-icon.png" width={20} height={20} alt="github" />
          </Link>
          <Link href="https://x.com/shuta_fr?s=21" target="_blank">
            <Image
              src="/x-icon.png"
              width={17}
              height={17}
              alt="x"
              style={{ marginTop: 3 }}
            />
          </Link> */}
        </div>
      </div>
      <p className={styles.title}>カテゴリ</p>
      <div className={styles.categoryWrapper}>
        {categoriesWithPostCount?.map(
          (category) =>
            category.postCount > 0 && (
              <Link
                className={styles.category}
                href={`/category/${category.category.id}`}
                key={category.category.id}
              >
                <>
                  {category.category.name}
                  {`(${category.postCount})`}
                </>
              </Link>
            )
        )}
      </div>
    </aside>
  );
};

export default SideMenu;
