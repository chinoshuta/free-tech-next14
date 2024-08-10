import { Metadata } from "next";
import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "ページが見つかりません",
};

export default function Page() {
  return (
    <div>
      <h1 className={styles.notFound}>ページが見つかりません</h1>
    </div>
  );
}
