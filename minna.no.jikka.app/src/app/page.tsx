//import Image from "next/image";
"use client";
import React, { Suspense, lazy } from 'react';
import Header from "./components/header";
import Footer from "./components/footer";
import LinkButton from "./components/linkButton";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Test = lazy(() => import('./components/test'));

const NotFound = lazy(() => import('./components/notFound'));
const Calender = lazy(() => import('./components/calendar'));
const ActivitiesPopup = lazy(() => import('./components/activityPopup'));
const OrgInfo = lazy(() => import('./components/orgInfo'));
const ContactForm = lazy(() => import('./components/contactForm'));

export default function Index() {
  return (
    <main>
      <Header/>
      <BrowserRouter>
        <Suspense fallback={<div className='bg-white text-black text-6xl h-[100vh] w-[100vw]'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Footer />
    </main>
  );
}

const Home = () => {
  return (
    <div className="Body mt-20 bg-white">
      <Link to="/login"><button className='text-6xl my-32 pt-20 text-black'>login</button></Link>

      <div className="Hero h-96 bg-gray-200">{/* hero section */}
        <img src="./images/index-hero-temp.webp" className="w-full h-full object-cover" alt="logo" />
      </div>
      
      <div className="w-full">{/* calendar section */}
        <h1 className="mt-12 mb-2 text-center text-black text-3xl font-medium leading-loose">みんなのカレンダー</h1>
        <p className="mb-12 text-center text-black text-xm font-medium leading-loose">下のイベントを押すことでそれぞれのイベントが確認できます</p>
        <Calender />
      </div>

      <div className="News bg-zinc-300 w-full py-8">{/* news section */}
        <h1 className="mt-12 text-center text-black text-3xl font-medium leading-loose">ニュース</h1>
        <div className="my-6 h-96 flex flex-col flex-wrap gap-5 justify-start mx-12 overflow-x-scroll snap-x">
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
          <div className="w-40 h-40 bg-neutral-50 snap-center" />
        </div>
      </div>

      <div className="About bg-white w-full">{/* about section */}
        <div className="About-Brief w-1/2 mx-auto flex flex-col items-center">
          <img src="./images/index_about_1.webp" className="w-full" alt="logo" />
          <p className="text-center text-black text-normal font-normal leading-normal"><b>『ともに笑う。ともに学ぶ。ともに生きる。』</b><br/><br/>【一般社団法人みんなの実家】は、地域を支え合う、人生を支え合う、一人一人を大切にし合う。<br/>そんな地域に密着した”第三の居場所”として運営されている総合型サードプレイス拠点です。<br/><br/>地域食堂やフリースクール、施設の貸し出しやイベントを展開しております。<br/>赤ちゃんから高齢者まで”だれでも気軽に”立ち寄ることができます。<br/><br/>さまざまな年齢層や背景を持つ方々と一期一会のつながりを楽しみながら、<br/>川べりの古民家でゆったりとした時間を共に過ごしましょう。</p>
          <LinkButton href="/another-path" text="試しに行ってみる" />
          <LinkButton href="/another-path" text="もっと詳しく" />
        </div>

        <div className="About-Details w-5/6 mx-auto flex flex-col items-center">
          <h1 className="text-center text-black text-3xl font-medium leading-10">ACTIVITIES</h1>
          <p className="text-center text-black text-normal font-light leading-normal">みんなの実家で行われている主な活動</p>
          <div className="w-full my-10 flex flex-wrap justify-around">
            <ActivitiesPopup 
              pjName_Jpn="みなよし食堂" pjName_Eng="Minayoshi Community Cafe" type="main" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<>赤ちゃんから高齢者の方まで。<br/>誰でも気軽に参加できる地域食堂です。<br/>ご家族、お友達、おひとり様、どなたでも<br/>昼食をお楽しみいただけます。<br/><br/>対象：どなたでも<br/>（要予約/<a href="#" className="text-orange-300">カレンダー</a>もしくは<a href="#" className="text-orange-300">お電話</a>から）<br/>時間：火・水・金・土の11:30 ~14:00<br/>値段：18歳以下無料 / 大人300円</>} />
            <ActivitiesPopup 
              pjName_Jpn="フリースクールほとり" pjName_Eng="FreeSchool Hotori" type="main" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<>学校に通うのが難しい小中学生を対象に<br/>学習支援を行っています。<br/>誰かとつながっていたいけど、<br/>大きな集団は難しい。<br/>今はゆっくり自分のペースで進めたい。<br/>そんな思いがあればぜひ見学に。<br/><br/>対象：小学生（4年生以上）・中学生<br/>時間：月・火・木・金の10:00 ~15:00</>} />
            <ActivitiesPopup 
              pjName_Jpn="みんなの広場" pjName_Eng="Square for All" type="main" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<>自分が得意なことや人と共有したいこと、<br/>ちょっとした集まりが開きたいときに。<br/>あなた自身が”1日ひろば長”となって、<br/>みんなの広場をともに作っていきましょ～。<br/><br/>対象：どなたでも<br/>　　 （要予約/<a href="#" className="text-orange-300">お電話</a>もしくは<a href="#" className="text-orange-300">こちら</a>から）<br/>例　：初心者が小説を書く会<br/>　　　当たらない占いを共に楽しむ集まり<br/>　　　セラピー＆ヨガ教室<br/>費用：無料</>} />
            <ActivitiesPopup 
              pjName_Jpn="みんなのたいわルーム" pjName_Eng="taiwaroom" type="sub" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<></>} />
            <ActivitiesPopup 
              pjName_Jpn="通信スペースえんがわ" pjName_Eng="Engawa High School" type="sub" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<></>} />
            <ActivitiesPopup 
              pjName_Jpn="M(みんなの)レジデンシ!" pjName_Eng="E-Residency for All" type="sub" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<></>} />
            <ActivitiesPopup 
              pjName_Jpn="川べり野菜の家" pjName_Eng="Riverside Vegetable Sta." type="sub" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<></>} />
            <ActivitiesPopup 
              pjName_Jpn="マンサポ！" pjName_Eng="Monthly Supporter" type="sub" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<></>} />
            <ActivitiesPopup 
              pjName_Jpn="にっしん塾" pjName_Eng="Nishinn juku" type="sub" 
              popupLinks={[ "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg","https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg","https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg","https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg","https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg" ]}
              popupContent={<></>} />
          </div>
          <LinkButton href="/another-path" text="お問い合わせ" />
        </div>
      </div>

      <div className="Support w-full flex justify-center bg-zinc-100">{/* support section */}
        <div className="flex">
          <div className="w-1/4 ml-28 mt-8 flex flex-col items-center">
            <img src="https://via.placeholder.com/545x413" className="w-full h-72" />
            <LinkButton href="/another-path" text="サポーターを見る" />
          </div>
          <div className="ml-12">
            <div className="mt-8 text-black text-2xl font-normal leading-10">みんなの実家サポーター【マンサポ】募集中！</div>
            <p className="text-black text-sm font-light leading-normal">みんなの実家では、私たちの取り組みを応援してくださる方々を求めています。<br/>私たちの活動は、皆様のご支援によって成り立っております。<br/><br/>【サポートの選択肢】<br/>ご予算に合わせて、ご支援の頻度や金額を選べます。<br/>一度きりのご寄付、または毎月の定期的なご支援を選択できます。<br/>ご支援していただく金額は自由に設定可能です<br/>　（500 / 1000 / 5000円等。みなさまの負担にならない範囲でのご支援をお待ちしています）<br/><br/>【資金の活用例】<br/>トイレのバリアフリー改修・地域食堂台所の改修・フリースクール活動費・物品購入・etc<br/><br/>ご支援は、みんなの実家に関わる全ての人が心地よく過ごせるために利用させていただきます。<br/>みんなの実家は、みなさまの心温まるサポートに感謝しています。ありがとうございますm(__)m</p>
          </div>
        </div>
      </div>

      <div className="Relation w-full flex flex-col items-center justify-center bg-white">{/* relation section */}
        <div className="Relation-Leader flex flex-col items-center mt-12">
          <h1 className="text-black text-2xl font-medium leading-loose">代表者プロフィール</h1>
          <div className="flex mt-6">
            <div className="">
              <img className="w-96 h-40e" src="https://via.placeholder.com/377x154" />
              <h3 className="text-center text-black text-xl font-light leading-loose mt-4">津村 雄一 / Yuichi Tsumura</h3>
              <h4 className="ml-1 text-black text-lg font-light leading-tight mt-2">生い立ち</h4>
              <p className="ml-1 text-black text-sm font-light leading-none">じゅげむ じゅげむ ごこうのすりきれ かい</p>
              <h4 className="ml-1 text-black text-lg font-light leading-tight mt-2">好きな言葉</h4>
              <p className="ml-1 text-black text-sm font-light leading-none">志あるところに道は開ける</p>
            </div>
            <div className="ml-8">
              <h3 className="text-black text-xl font-light leading-loose">代表からのメッセージ</h3>
              <p className=" text-black text-sm font-light leading-normal">2020年10月に任意団体「地域コミュニティらるらりら」を立ち上げ、<br/>鳥取市内を中心に地域食堂や学習支援、各種イベントを開催してまいりました。<br/>スタッフ一同楽しみながら約２年間活動を続け、<br/>2022年8月には念願であった活動拠点となる「みんなの実家」を設立することができました。<br/>『ともに生きる、ともに学ぶ、ともに笑う』をモットーに、<br/>地域密着型サードプレイス事業として、地域食堂やフリースクール、学習塾、各種教室事業を展開しております。<br/>地域の居場所となるよう尽力し、少しずつ形になってきていると感じます。<br/>これも一重に、地域の皆様やボランティアスタッフの皆様、行政や企業の皆様のお力添えによるものとあらためて感謝申し上げます。<br/>開所から約半年が過ぎた2023年4月より、経営基盤を強化するとともに、<br/>より一層の事業内容充実を進めるために「一般社団法人みんなの実家」となりました。<br/><br/>今後も引き続き、赤ちゃんから高齢者まで、誰でも気軽に立ち寄ることができ、様々な形で交流し、<br/>みんながつながっていく拠点として、多くの方にこのみんなの実家をご活用いただきたいと思います。</p>
              <p className="text-right text-black text-lg font-light leading-tight">2024.xx.xx 津村 雄一</p>
            </div>
          </div>
        </div>

        <div className="Relation-Org flex flex-col items-center mt-12 w-full">
          <h1 className="text-center text-black text-3xl font-medium leading-loose">法人情報</h1>
          <OrgInfo item_name="法人名" item_text="一般社団法人みんなの実家" />
          <OrgInfo item_name="設立日" item_text="2023年4月xx日" />
          <OrgInfo item_name="事業内容" item_text="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
          <OrgInfo item_name="所在地情報" item_text="〒680-0843 鳥取県鳥取市南吉方３丁目２１５番地" />
          <OrgInfo item_name="連絡先情報" item_text={<>固　定　電　話：0857-32-8482<br/>メールアドレス：minna.no.jikka.2022@gmail.com</>} />
        </div>
      </div>

      <ContactForm />{/* contact section */}

      <div className="w-full mt-12 flex flex-col items-center justify-center bg-white">{/* access section */}
        <h1 className="text-center text-black text-2xl font-normal leading-9">アクセス</h1>
        <h4 className="text-center text-black text-lg font-light leading-normal">みんなの実家への行き方</h4>
        <div className="flex w-3/4 justify-around mt-8">
          <div className="w-1/2 h-96 bg-zinc-300">

          </div>
          <div className="ml-4 w-2/5">
            <h4 className="text-neutral-400 text-xl font-normal leading-normal">住所</h4>
            <p className="text-black mt-3 text-lg font-light leading-normal">〒680-0843<br/>鳥取県鳥取市南吉方３丁目２１５番地</p>
            <div className="w-full h-64 mt-5 bg-zinc-300" >
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.8092147268467!2d134.23942167544794!3d35.48426394076943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35558f7a3d93cd2d%3A0x809ef6331c025e9!2z44G_44KT44Gq44Gu5a6f5a62!5e0!3m2!1sja!2sjp!4v1709526478459!5m2!1sja!2sjp" width="600" height="450" className="w-full h-full" loading="lazy" ></iframe>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
