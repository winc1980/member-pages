import React, { useState } from "react";
import Head from "next/head";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <Head>
        <title>Next.js x microCMS - Tutorial</title>
      </Head>
      <footer className={styles.footerClass}>
        <small>&copy; 早稲田大学コンピュータ研究会・WINC</small>
      </footer>
    </>
  );
}
