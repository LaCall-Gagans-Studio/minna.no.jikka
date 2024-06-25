import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import Head from "next/head"; // 追加
import "./globals.css";

const zenMaruGothic = Zen_Maru_Gothic({
  style: 'normal',
  weight: ["300", "400", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "みんなの実家 - 地域密着型総合サードプレイス拠点",
  description: "みんなの実家は、鳥取県鳥取市にある地域密着型総合サードプレイス拠点です。普段は地域食堂/子ども食堂や認定フリースクールを運営しています。川べりの古民家で、一期一会の出会いを楽しみましょう。ぜひ遊びに来てくださいね。",
  keywords: ["みんなの実家", "コミュニティ", "地域", "イベント", "ニュース", "子ども食堂", "地域食堂", "フリースクール", "鳥取県", "鳥取市", "鳥取", "サードプレイス"],
  authors: [{ name: "合同会社ラコールガガンズ" }],
  openGraph: {
    title: "みんなの実家 - コミュニティとつながる場所",
    description: "みんなの実家は、鳥取県鳥取市にある地域密着型総合サードプレイス拠点です。普段は地域食堂/子ども食堂や認定フリースクールを運営しています。川べりの古民家で、一期一会の出会いを楽しみましょう。ぜひ遊びに来てくださいね。",
    type: "website",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "みんなの実家",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "みんなの実家 - コミュニティとつながる場所",
    description: "みんなの実家は、鳥取県鳥取市にある地域密着型総合サードプレイス拠点です。普段は地域食堂/子ども食堂や認定フリースクールを運営しています。川べりの古民家で、一期一会の出会いを楽しみましょう。ぜひ遊びに来てくださいね。",
    images: "https://yourwebsite.com/twitter-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
      </Head>
      <body className={zenMaruGothic.className}>{children}</body>
    </html>
  );
}
