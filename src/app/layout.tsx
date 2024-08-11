import type { Metadata } from "next";
import Header from "@/components/Header";
import styles from "./layout.module.scss";
import SideMenu from "@/components/SideMenu";
import "@/helpers/css/style.scss";
import "modern-css-reset";
import { Suspense } from "react";
import { Noto_Sans_JP, Lato } from "next/font/google";
import clsx from "clsx";

const notoJP = Noto_Sans_JP({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-notojp",
});
const lato = Lato({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-lato",
});

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
    <html lang="ja" className={clsx(notoJP.variable, lato.variable)}>
      <body className={styles.body}>
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
