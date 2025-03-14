import styles from "./page.module.scss";

const AboutPage = () => {
  return (
    <>
      <section className={styles.wrapper}>
        <h1 className={styles.title}>当ブログについて</h1>
        <p className={styles.text}>
          当ブログはフリーランスエンジニアの筆者が運営するブログです。
          <br />
          フリーランスとして活動していく中での出来事や、技術情報について主に投稿していきます。
          <br />
          ご連絡等は以下からお願いします。
          <br />
          <a href="https://linktr.ee/shutachino" target="_blank">
            https://linktr.ee/shutachino
          </a>
        </p>
        <h1 className={styles.title}>筆者について</h1>
        <p className={styles.text}>
          関東在住の30代男性です。
          <br />
          情報系の学部を卒業後、新卒でIT企業に入社し、これまで開発をメインに仕事を続けてきました。
          <br />
          Java、C#を用いた業務系システムの開発からReactを用いたフロントエンド開発まで経験しておりますが、
          <br />
          実際にユーザーの目に触れる部分をつくる手応えや、Reactを用いた開発体験の面白さから、今後はReactを用いたフロントエンド開発をメインに行なっていきたいと思っております。
        </p>
        <h1 className={styles.title}>経歴</h1>
        <div className={styles.text}>
          <ul>
            <li>
              SIerのパートナー企業で主にJava・C#を用いた公共系システムの開発を約3年半
            </li>
            <li>
              ベンチャー企業でWebアプリ、スマートフォンアプリの受託開発を約1年
            </li>
            <li>
              フリーランスエンジニアとしてフロントエンド開発をメインに案件に参画（現在）
            </li>
          </ul>
        </div>
        <h1 className={styles.title}>経験技術</h1>
        <div className={styles.text}>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Vue.js</li>
            <li>Nuxt.js</li>
            <li>Go</li>
            <li>SQL</li>
            <li>ReactNative</li>
            <li>PHP</li>
            <li>Java</li>
            <li>C#</li>
          </ul>
          ※詳細な経歴をご希望の方は別途お問い合わせください
        </div>
      </section>
    </>
  );
};

export default AboutPage;
