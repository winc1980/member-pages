import Head from "next/head";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <Head>
        <title>Next.js x microCMS - Tutorial</title>
      </Head>
      {/* ヘッダー　ここから */}
      <header>
        <div className="hamburger-menu">
          <p>コンピュータ研究会・WINC</p>
          <input type="checkbox" id="menu-btn-check" />
          <label htmlFor="menu-btn-check" className="menu-btn">
            <span></span>
          </label>
          <div className="menu-content">
            <ul>
              <li>
                <a href="#">MEMBER PROFILE</a>
              </li>
              <li>
                <a href="#">ACCOUNTING</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {/* ヘッダー　ここまで */}
    </>
  );
}
