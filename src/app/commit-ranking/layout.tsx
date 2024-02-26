import type { Metadata } from "next";
import "../../../public/styles/commit-ranking.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="">{children}</body>
    </html>
  );
}
