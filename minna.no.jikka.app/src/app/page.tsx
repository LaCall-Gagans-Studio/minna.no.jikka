"use client";
//Library
import React, { Suspense, lazy} from 'react';
import AnimationWrapper from "./components/animationWrapper";
import { Link, Element } from 'react-scroll';
import { BrowserRouter, Routes, Route, Link as RouterLink} from 'react-router-dom';
//components
import Header from "./components/header";
import LinkButton from "./components/linkButton";
const Footer = lazy(() => import('./components/footer'));
//elements
const HeroSlideshow = lazy(() => import('./elements/heroSlideshow'));
const Calender = lazy(() => import('./elements/calendar'));
const InstagramPosts = lazy(() => import('./elements/instagramPosts'));
const ActivitiesPopup = lazy(() => import('./elements/activityPopup'));
const ChairmanInfo = lazy(() => import('./elements/chairmanInfo'));
const OrgInfo = lazy(() => import('./elements/orgInfo'));
const ContactForm = lazy(() => import('./elements/contactForm'));
//pages
const RevAdmin = lazy(() => import('./revAdmin'));
const Building = lazy(() => import('./building'));


export default function Index() {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div className='bg-white text-black text-6xl h-screen w-screen absolute left-1/2 transform -translate-x-1/2 '>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<RevAdmin />}/>
            <Route path="/building" element={<Building />} />
            <Route path="/admin" element={<RevAdmin />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

const Home = () => {
  return (
    <div className="Body text-black mt-20 bg-white">

      <HeroSlideshow/>{/* hero section */}

      {/* SNS section */}
      <div className='relative'>
        <div className='absolute right-0 top-[-4rem] gap-20 py-3 px-10 rounded-xl bg-white'>

          <div className='flex items-center my-2'>
            <a className='absolute z-30 left-7' href='https://www.instagram.com/minna_no_jikka2022/'>
              <img src={`./sns/instagram.svg`} className='w-20 h-20 hover:scale-105 ' alt='Instagram'/>
            </a>
            <div className='bg-orange-300 pl-16 text-white border px-2 py-5 text-xs text-nowrap rounded-lg'>最新ニュースはこちら！</div>
          </div>

          <div className='flex items-center my-2'>
            <a className='absolute z-30 left-7' href='https://lin.ee/J5nurNO'>
              <img src={`./sns/line.svg`} className='w-20 h-20 hover:scale-105 ' alt='Instagram'/>
            </a>
            <div className='bg-orange-300 pl-16 text-white border px-2 py-5 text-xs text-nowrap rounded-lg'>最新ニュースはこちら！</div>
          </div>
        </div>
      </div>

      <div className="w-full">{/* calendar section */}
        <h1 className="mt-12 text-center text-black text-3xl font-medium leading-loose">みんなのカレンダー</h1>
        <p className="mb-12 text-center text-slate-500 text-xm font-medium leading-loose">下のイベントを押すことでそれぞれのイベントが確認できます</p>
        <Calender />
      </div>

      <div className="bg-zinc-200 w-full py-8">{/* news section */}
        <AnimationWrapper animationType="fade-up">
          <Element name="news" />
          <h1 className="mt-12 text-center text-black text-xl font-medium leading-loose lg:text-3xl">ニュース</h1>
          <InstagramPosts />
        </AnimationWrapper>
      </div>
      
      <div className="About bg-white w-full">{/* about section */}
        <div className="About-Brief w-5/6 lg:w-1/2 mx-auto flex flex-col items-center">
          <Element name="about" />
          <AnimationWrapper animationType='fade-up'>
            <img src="./images/index_about_1.webp" className="w-full " alt="再読み込みしてください" />
          </AnimationWrapper>
          <AnimationWrapper animationType='fade-up'>
          <p className="text-center text-black text-base lg:text-normal font-bold leading-normal">『ともに笑う。ともに学ぶ。ともに生きる。』</p>
          <p className="text-center text-black text-sm lg:text-normal font-normal leading-normal"><br/><br/>【一般社団法人みんなの実家】は、<br className="block lg:hidden"/>地域を支え合う、<br className="block lg:hidden"/>人生を支え合う、<br className="block lg:hidden"/>一人一人を大切にし合う。<br className="block lg:hidden"/>そんな地域に密着した<br className="block lg:hidden"/>”第三の居場所”として運営されている<br className="block lg:hidden"/>総合型サードプレイス拠点です。<br/><br/>地域食堂やフリースクール、<br className="block lg:hidden"/>施設の貸し出しやイベントを展開しております。<br/>赤ちゃんから高齢者まで<br className="block lg:hidden"/>”だれでも気軽に”立ち寄ることができます。<br/><br/>さまざまな年齢層や背景を持つ方々と<br className="block lg:hidden"/>一期一会のつながりを楽しみながら、<br/>川べりの古民家で<br className="block lg:hidden"/>ゆったりとした時間を共に過ごしましょう。</p>
          </AnimationWrapper>
          <AnimationWrapper animationType='fade-up'>
            <Link to="access" smooth={true} duration={500}>
              <LinkButton href="" text="試しに行ってみる" />
            </Link>
          </AnimationWrapper>
          <Link to="activities" smooth={true} duration={500}>
            <LinkButton href="" text="もっと詳しく" />
          </Link>
        </div>

        <div className="About-Details w-5/6 mx-auto flex flex-col items-center">
          <h1 className="text-center text-black text-3xl font-medium leading-10">ACTIVITIES</h1>
          <p className="text-center text-black text-normal font-light leading-normal">みんなの実家で行われている主な活動</p>
          <Element name="activities" />
          <div className="w-full my-5 lg:my-10 flex flex-wrap gap-1 justify-around">
            <ActivitiesPopup popupContentId="minayoshi" type="main" />{/* みなよし食堂*/}
            <ActivitiesPopup popupContentId="hotori" type="main" />{/* FSほとり */}
            <ActivitiesPopup popupContentId="hiroba" type="main" />{/* みんなの広場 */}
            <ActivitiesPopup popupContentId="danwa" type="sub" />{/* だんわタイム */}
            <ActivitiesPopup popupContentId="engawa" type="sub" />{/* スペースえんがわ */}
            <ActivitiesPopup popupContentId="residency" type="sub" />{/* レジデンシ */}
            <ActivitiesPopup popupContentId="shelf" type="sub" />{/* 棚オーナー */}
            <ActivitiesPopup popupContentId="supporter" type="sub" />{/* みんサポ */}
            <ActivitiesPopup popupContentId="nishin" type="sub" />{/* にっしん館 */}
          </div>
          <Link to="contact" smooth={true} duration={500}>
            <LinkButton href="" text="お問い合わせ" />
          </Link>
        </div>
      </div>

      <div className="Support w-full flex justify-center bg-zinc-100 pb-10">{/* support section */}
        <AnimationWrapper animationType='fade-up'>
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <div className="w-1/4 lg:ml-28 mt-8 flex flex-col items-center">
              <img src="./images/index_supporter_logo.webp" className="w-full h-auto" />
              <RouterLink to="/building" className='flex gap-3 border-l-2 lg:border-0 pl-3 items-center'>
                <LinkButton href="/building" text="サポーターを見る" />
              </RouterLink>
            </div>
            <div className="lg:ml-12">
              <div className="mx-3 lg:mx-0 mt-8 text-black text-xl lg:text-2xl font-normal leading-2">みんなの実家サポーター<br className="block lg:hidden"/>【マンサポ】募集中！</div>
              <p className="mx-3 lg:mx-0 text-black text-xs lg:text-sm font-light leading-normal">みんなの実家では、私たちの取り組みを応援してくださる方々を求めています。<br/>私たちの活動は、皆様のご支援によって成り立っております。<br/><br/>【サポートの選択肢】<br/>ご予算に合わせて、ご支援の頻度や金額を選べます。<br/>一度きりのご寄付、または毎月の定期的なご支援を選択できます。<br/>ご支援していただく金額は自由に設定可能です<br/>　（500 / 1000 / 5000円等。みなさまの負担にならない範囲でのご支援をお待ちしています）<br/><br/>【資金の活用例】<br/>トイレのバリアフリー改修・地域食堂台所の改修・フリースクール活動費・物品購入・etc<br/><br/>ご支援は、みんなの実家に関わる全ての人が心地よく過ごせるために利用させていただきます。<br/>みんなの実家は、みなさまの心温まるサポートに感謝しています。ありがとうございますm(__)m</p>
            </div>
          </div>
          </AnimationWrapper>
      </div>

      <div className="Relation w-full flex flex-col items-center justify-center bg-white">{/* relation section */}
        <AnimationWrapper animationType='fade-up'>
          <Element name="profile" />
          <ChairmanInfo />
        </AnimationWrapper>
        <AnimationWrapper animationType='fade-up' additionalClass='w-full'>
          <OrgInfo />
          </AnimationWrapper>
      </div>

      <Element name="contact" />
      <ContactForm />{/* contact section */}

      <div className="w-full mt-12 flex flex-col items-center justify-center bg-white">{/* access section */}
        <Element name="access" />
        <h1 className="text-center text-black text-xl lg:text-2xl font-normal leading-9">アクセス</h1>
        <h4 className="text-center text-black text-sm lg:text-lg font-light leading-normal">みんなの実家への行き方</h4>
        <div className="flex flex-col lg:flex-row items-center h-auto w-11/12 lg:w-3/4 lg:justify-around mt-8">
          <iframe className="w-full lg:w-1/2 h-56 lg:h-80 justify-center" src="https://www.youtube.com/embed/V5Y_mnlZqKg?si=pGITvAxbTMpN9D8Q&amp;controls=0" title="Map To Destination" allow="picture-in-picture; web-share"></iframe>
          <div className="lg:ml-4 w-5/6 lg:w-2/5">
            <h4 className="text-neutral-400 mt-3 lg:mt-0 text-xs lg:text-xl font-normal leading-normal">住所</h4>
            <p className="text-black lg:mt-3 text-sm lg:text-lg font-light leading-normal">〒680-0843<br/>鳥取県鳥取市南吉方３丁目２１５番地</p>
            <div className="w-full h-64 mt-5 bg-zinc-300" >
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3248.8092147268467!2d134.23942167544794!3d35.48426394076943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35558f7a3d93cd2d%3A0x809ef6331c025e9!2z44G_44KT44Gq44Gu5a6f5a62!5e0!3m2!1sja!2sjp!4v1709526478459!5m2!1sja!2sjp" width="600" height="450" className="w-full h-full" loading="lazy" ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};