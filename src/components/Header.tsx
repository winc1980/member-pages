import React, { useState } from "react";
import Head from "next/head";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <Head>
        <title>Next.js x microCMS - Tutorial</title>
      </Head>
      {/* ヘッダー　ここから */}
      <header>
        <div className={styles["hamburger-menu"]}>
          <Image src="/images/winc_logo.webp" alt=""  width={50} height={50}/>
          <p className="text-lg font-bold">コンピュータ研究会・WINC</p>
          <input
            type="checkbox"
            id="menu-btn-check"
            className={styles["menu-btn-check"]}
          />
          <label htmlFor="menu-btn-check" className={styles["menu-btn"]}>
            <span></span>
          </label>
          <div className={styles["menu-content"]}>
            <ul>
              <li>
                <a href="#">TOP</a>
              </li>
              <li>
                <a href="#">メンバー一覧</a>
              </li>
              <li>
                <a href="#">コミットランキング</a>
              </li>
              <li>
                <a href="#">会計</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {/* ヘッダー　ここまで */}
    </>
  );
}
