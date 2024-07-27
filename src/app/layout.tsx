import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import styles from "./layout.module.scss";
import SideMenu from "@/components/SideMenu";
import "normalize.css/normalize.css";
import "@/helpers/css/style.scss";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "free技術log",
  description:
    "フリーランスエンジニアのブログです。主に技術情報について投稿しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <div className={styles.wrapper}>
          <div className={styles.contentsWrapper}>
            <Suspense fallback={<></>}>{children}</Suspense>
          </div>
          <SideMenu />
        </div>
        <footer className={styles.footer}>
          ©free 技術log all rights reserved.
        </footer>
      </body>
    </html>
  );
}
