import type { Metadata as NextMetadata } from 'next';
import { Zen_Maru_Gothic } from 'next/font/google';
import Head from 'next/head'; // 追加
import './globals.css';

interface Metadata extends NextMetadata {
  others: {
    type: string;
    url: string;
    images: { url: string; width: number; height: number; alt: string }[];
  };
}

const zenMaruGothic = Zen_Maru_Gothic({
  style: 'normal',
  weight: ['300', '400', '700'],
  subsets: ['latin']
});

export const metadata: Metadata  = {
  title: 'みんなの実家 - 地域密着型総合サードプレイス拠点',
  description: 'みんなの実家は、鳥取県鳥取市にある地域密着型総合サードプレイス拠点です。普段は地域食堂/子ども食堂や認定フリースクールを運営しています。川べりの古民家で、一期一会の出会いを楽しみましょう。ぜひ遊びに来てくださいね。',
  keywords: ['みんなの実家', 'コミュニティ', '地域', 'イベント', 'ニュース', '子ども食堂', '地域食堂', 'フリースクール', '鳥取県', '鳥取市', '鳥取', 'サードプレイス'],
  authors: [{ name: '合同会社ラコールガガンズ' }],
  others: {
    type: 'website',
    url: 'https://minna-no-jikka.jp/',
    images: [
      {
        url: '/images/hero/1.webp',
        width: 800,
        height: 600,
        alt: 'みんなの実家',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src='https://www.googletagmanager.com/gtag/js?id=G-GMLVT79WNJ'></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GMLVT79WNJ');
          `,
        }} />
        <title>{metadata.title as string}</title>
        <meta name='description' content={metadata.description as string} />
        <meta name='keywords' content={Array.isArray(metadata.keywords) ? metadata.keywords.join(', ') : ''} />
        <meta name='authors' content={metadata.authors as string} />
         {/* Social Meta Tags */}
        <meta property='og:title' content={metadata.title as string} />
        <meta property='og:description' content={metadata.description as string} />
        <meta property='og:type' content={metadata.others.type as string} />
        <meta property='og:url' content={metadata.others.url as string} />
        <meta property='og:image' content={metadata.others.images[0].url as string} />
        <meta property='og:image:width' content={String(metadata.others.images[0].width) as string} />
        <meta property='og:image:height' content={String(metadata.others.images[0].height) as string} />
        <meta property='og:image:alt' content={metadata.others.images[0].alt as string} />
      </Head>
      <body className={zenMaruGothic.className}>{children}</body>
    </html>
  );
}

