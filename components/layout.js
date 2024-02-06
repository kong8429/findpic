import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../components/styles/layout.module.css";

export default function Layout({ children, headerBk, headerWh, returnBack }) {
  const router = useRouter();
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const search = () => {
    const searchBar = document.querySelector(`.${styles.searchBar}`);
    if (input === "") {
      setValue(sessionStorage.clear());
      return router.push("/");
    }
    router.push(`/search/pic/${input}`);
    searchBar.setAttribute("value", input);
    console.log(searchBar.value);
  };

  return (
    <div className={styles.layout}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Paula" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&family=Roboto&display=swap');
        </style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <title>FindPic</title>
      </Head>

      {headerWh && (
        <header className={styles.headerWh}>
          <Link href="/" className={styles.title}>
            FindPic
          </Link>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="搜尋"
              className={styles.searchBar}
              onChange={inputHandler}
            />
            <button className={styles.searchBtn} onClick={search}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </header>
      )}
      <main className={styles.main}>
        <div>{children}</div>
      </main>

      {returnBack && (
        <Link className={styles.home} href="/">
          回到首頁
        </Link>
      )}
      <footer className={styles.footer}>
        <br />
        ©這是練習作品
      </footer>
    </div>
  );
}
