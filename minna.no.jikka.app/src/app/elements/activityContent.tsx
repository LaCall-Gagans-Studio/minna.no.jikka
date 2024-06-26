import React from 'react';

// PopupLink 型の定義
interface PopupLink {
    url: string;
}

// ActivityContent の型定義
interface ActivityContent {
    description: JSX.Element;
    pjName_Jpn: string;
    pjName_Eng: string;
    popupLinks: string[];
}

interface TextsMap {
    [key: string]: ActivityContent; 
}

const activityContent: TextsMap = {
    "minayoshi": {
        description: (
            <>
                赤ちゃんから高齢者の方まで。<br/>
                誰でも気軽に参加できる地域食堂です。<br/>
                ご家族、お友達、おひとり様、どなたでも<br/>
                昼食をお楽しみいただけます。<br/>
                <br/>
                対象：どなたでも<br/>
                （要予約/<a href="https://lin.ee/J5nurNO" className="text-orange-300 hover:text-orange-400">公式LINE</a>もしくは<a href="tel:0857328482" className="text-orange-300 hover:text-orange-400">お電話</a>から）<br/>
                時間：火・水・金・土の11:30 ~14:00<br/>
                値段：18歳以下無料 / 大人300円
            </>
        ),
        pjName_Jpn:"みなよし食堂",
        pjName_Eng:"Minayoshi Community Cafe",
        popupLinks: [
            "./images/activities/minayoshi/minayoshi1.webp",
            "./images/activities/minayoshi/minayoshi2.webp",
            "./images/activities/minayoshi/minayoshi3.webp",
            "./images/activities/minayoshi/minayoshi4.webp",
            "./images/activities/minayoshi/minayoshi5.webp"
        ]
    },
    "hotori": {
        description: (
            <>
                学校に通うのが難しい小中学生を対象に<br/>
                学習支援を行っています。<br/>
                誰かとつながっていたいけど、<br/>
                大きな集団は難しい。<br/>
                今はゆっくり自分のペースで進めたい。<br/>
                そんな思いがあればぜひ見学に。<br/><br/>
                対象：小学生（4年生以上）・中学生<br/>
                時間：月・火・木・金の10:00 ~15:00<br/>
                鳥取県認定フリースクール「ほとり」（2024.1.5認定）<br/>
                <br/>
                川のほとりにあるこじんまりとしたフリースクールです。<br/>
                古民家内で自分のペースで学習を進められます。<br/>
                教職経験者、塾指導経験者がサポートし、基礎学力の定着を目指します。<br/>
                <br/>
                ・プログラミング、<br/>
                ・調理実習、<br/>
                ・キャリア学習<br/>
                などの他にも、<br/>
                ・登山<br/>
                ・BBQ<br/>
                ・スキー＆スノボ研修、<br/>
                県外研修（２年に１回を予定）<br/>
                などの校外学習も楽しみながら過ごせます。<br/>
                <br/>
                ひとりひとりがほっとできる居場所であることはもちろんのこと、<br/>
                学校に通っていてもいなくても、<br/>
                学校復帰をしてもしなくても、<br/>
                社会に出たときに困らない力をつけるためのサポートをしていきたい。<br/>
                それが、スタッフ一同の思いです。<br/>
                <br/>
                <br/>
                【対象学年】 小学４年生～中学３年生<br/>
                【開校曜日】 月曜日、火曜日、木曜日、金曜日<br/>
                【開校時間】 10:00～14:40<br/>
                【　定員　】 ８名<br/>
                ※ガイダンス資料は、<a className='text-orange-300 hover:text-orange-400' href='https://drive.google.com/drive/folders/16SY4V4OFGIinePe2Vs_ZmWRaSXaqf8Sr?usp=sharing'>こちら</a><br/>
                <br/>
                見学・体験希望の方は、<br />
                事前にお電話にてご連絡ください。<br/>
                <a href='tel:0857328482' className='text-orange-300 hover:text-orange-400'>📞0857-32-8482</a>（フリースクールほとり担当：小林）<br/>
            </>
        ),
        pjName_Jpn:"フリースクールほとり",
        pjName_Eng:"FreeSchool Hotori",
        popupLinks: [
            "./images/activities/hotori/hotori1.webp",
            "./images/activities/hotori/hotori2.webp",
            "./images/activities/hotori/hotori3.webp",
            "./images/activities/hotori/hotori4.webp",
            "./images/activities/hotori/hotori5.webp"
        ]
    },
    "hiroba": {
        description: (
            <>
                自分が得意なことや人と共有したいこと、<br/>
                ちょっとした集まりが開きたいときに。<br/>
                あなた自身が”1日ひろば長”となって、<br/>
                みんなの広場をともに作っていきましょ～。
                <br/><br/>
                対象：どなたでも<br/>
                （要予約/<a href="https://docs.google.com/forms/d/e/1FAIpQLSd7Cvqp9ce_rTIwUyAWIKnNReO2kw5HM_FBSjOeRxRySRZK6w/viewform?usp=sf_link" className="text-orange-300 hover:text-orange-400">こちら</a>のフォームから）<br/>
                <br/>
                例　：初心者が小説を書く会<br/>
                　　　当たらない占いを共に楽しむ集まり<br/>
                　　　セラピー＆ヨガ教室<br/>
                　　　お茶会<br/>
                　　　いちからラーメンを作ってみる会<br/>
                　　　マタニティヨガ<br/>
                　　　英会話教室<br/>
                　　　卓球クラブ<br/>
                <br/>
                費用：無料<br/>
                　　　<span className='text-xs'>※告知をしてほしい場合などは料金が掛かります。</span><br/>
            </>
        ),
        pjName_Jpn:"みんなの広場",
        pjName_Eng:"Square for All",
        popupLinks: [
            "./images/activities/hiroba/hiroba1.webp",
            "./images/activities/hiroba/hiroba2.webp",
            "./images/activities/hiroba/hiroba3.webp",
            "./images/activities/hiroba/hiroba4.webp",
            "./images/activities/hiroba/hiroba5.webp"
        ]
    },
    "danwa": {
        description: (
            <>
                2024年４月より「みんなのたいわルーム」がスタートしました！<br />
                <br/>
                子育てのこと、家族のこと、仕事のこと、自分のこと・・<br />
                誰かに話を聞いてもらいたいな、というお悩みやモヤモヤをコーチングの資格をもったホッとサポーターがお話をお聞きします。<br />
                また、たいわルームの月に１度のイベントとして、生活や子育てに活かせられる様々な分野のお楽しみ講座を開催します。<br/>
                保護者の皆さんが楽しめ、つながり、ホッとできる時間をお届けします♪<br />
                <br />
                ＜たいわルーム利用＞※予約優先<br />
                受付時間　：毎週火・木　10時～15時<br />
                たいわ時間：お一人　約４５分程度<br />
                利　用　料：無料<br />
                利用方法　：対面（みんなの実家）orオンライン<br />
                <br />
                ＜毎月のお楽しみ講座＞　参加費500円（昼食付）、定員10名前後<br />
                「薬膳料理を学び、味わおう」<br/>
                「こどもとコミュニケーションをとる時のポイント」<br/>
                「こどものマネースクール」<br/>
                等々開催予定。<br/>
                講座や日時の詳細などはお問合せフォームからお問合せください。<br />
                対話ルームの利用予約・お楽しみ講座の詳細確認はこちらからお願いします<br />
                <a href='https://docs.google.com/forms/d/1sF3UD-G2nW69cQZ3a8YRL79qYL3IVHiVAtMueZ9jGKE/edit' className='text-orange-300 hover:text-orange-400'>→こちらから</a><br />
                お問合せは、下記メールアドレスからでも承っております。<br />
                <a href='mailto:taiwa.minjitsu@gmail.com' className='text-orange-300 hover:text-orange-400'>taiwa.minjitsu@gmail.com</a><br />
            </>
        ),
        pjName_Jpn:"みんなの談話タイム",
        pjName_Eng:"Danwa Time",
        popupLinks: [
            "./images/activities/danwa/danwa1.webp",
            "./images/activities/danwa/danwa2.webp",
            "./images/activities/danwa/danwa3.webp",
            "./images/activities/danwa/danwa4.webp",
            "./images/activities/danwa/danwa5.webp"
        ]
    },
    "engawa": {
        description: (
            <>
                準備中です。<br />
                もうしばらくお待ちくださいm(__)m<br />
            </>
        ),
        pjName_Jpn:"通信スペースえんがわ",
        pjName_Eng:"Engawa High School",
        popupLinks: [
            "./images/activities/notReady/notReady.webp"
        ]
    },
    "residency": {
        description: (
            <>
                準備中です。<br />
                もうしばらくお待ちくださいm(__)m<br />
            </>
        ),
        pjName_Jpn:"Mレジデンシ!",
        pjName_Eng:"E-Residency for All",
        popupLinks: [
            "./images/activities/notReady/notReady.webp"
        ]
    },
    "shelf": {
        description: (
            <>
                告知や物販に使える棚を貸し出しています。<br />
                <br />
                ご自身で作ったアクセサリーやクッキー、<br />
                沢山の人に手に取って呼んでほしい本、<br />
                とにかく紹介したい自分の”好き”や<br />
                行っている活動の紹介まで。<br />
                <br />
                使用例：特製キムチコーナー<br />
                　　　　自作ピアス物販<br />
                　　　　食育本紹介<br />
                　　　　1日1問問題コーナー<br />
                　　　　自作アート展示<br />
                <br />
                その利用の方法は無数にあります。<br />
                興味がありましたら、ぜひスタッフにお声がけください😊<br />
            </>
        ),
        pjName_Jpn:"棚オーナー",
        pjName_Eng:"Shelf Owner",
        popupLinks: [
            "./images/activities/shelf/shelf1.webp",
            "./images/activities/shelf/shelf2.webp",
            "./images/activities/shelf/shelf3.webp",
            "./images/activities/shelf/shelf4.webp",
            "./images/activities/shelf/shelf5.webp",
        ]
    },
    "supporter": {
        description: (
            <>
                みんなの実家の活動を寄付応援していただける方を募集中です。<br />
                【募金金額や頻度】<br />
                　ご自分に合ったスタイルで始められます。<br />
                　500円／1,000円／5,000円　など<br />
                　1度限り／毎月／3か月ごと　など<br />
                【お支払い方法】<br />
                　銀行口座振替<br />
                　ネットでの継続寄付も只今準備中<br />
                <br />
                　詳しくはお電話にてお問い合わせください。<br />
                　<a href='tel:0857328482' className='text-orange-300 hover:text-orange-400'></a>📞0857-32-8482<br />
            </>
        ),
        pjName_Jpn:"みんサポ！",
        pjName_Eng:"Monthly Supporter",
        popupLinks: [
            "./images/activities/supporter/supporter1.webp",
            "./images/activities/supporter/supporter2.webp",
            "./images/activities/supporter/supporter3.webp",
            "./images/activities/supporter/supporter4.webp",
            "./images/activities/supporter/supporter5.webp",
        ]
    },
    "nishin": {
        description: (
            <>
                学習塾日心館では、生徒それぞれに応じて学習を進めます。<br />
                初回授業で現状を分析し、課題を共有。<br />
                →〖当たりすぎて怖い…、と引かれますが〗<br />
                それを元に、適したコースと進め方、学習時間を設定。<br />
                悩み相談で、学習の妨げになる問題を解決。<br />
                →〖同級生やご家族へ言いにくいことも、塾の方が話しやすいと…〗<br />
                勉強に集中できるよう、心を整えます。<br />
                →〖涙を見せられる方も…、スッキリしてお帰りに〗<br />
                無料体験を承っていますので、お気軽にご相談ください。<br />
                <br />
                <br />
                曜日：月曜日～土曜日(日曜・祝日は除く)<br />
                時間：17:00～21:30※要相談<br />
                場所：鳥取市南吉方３丁目２１５ みんなの実家 2階<br />
                ※ご自宅での指導も承ります<br />
                対象学年：小・中・高校生＜5教科対応＞<br />
                月謝：⓵ 個別指導 ＜生徒最大5名まで＞ 【要相談】各90分授業<br />
                ⇒ 週1回 13,200円（税込） 週2回 22,000円（税込）<br />
                <br />
                ⓶ 個人指導 ＜マンツーマン指導＞ 【空きはございます】<br />
                ⇒ 1時間 4,400円（税込） ※要相談<br />
                30分／1時間／1.5時間／2時間　コースのいずれか<br />
                <br />
                ⓷ 家庭派遣 ＜ご自宅での指導＞ 【空きはございます】<br />
                ⇒ 1時間 4,400円（税込）+ 交通費 ※要相談<br />
                30分／1時間／1.5時間／2時間　コースのいずれか<br />
                <br />
                出張授業：若桜町にて個別指導 ＜生徒最大5名まで＞ 【空きはございます】<br />
                場所：八頭郡若桜町若桜356-1<br />
                ごはんとおみやげyamaneya 2階<br />
                <a href='tel:0858711020' className='text-orange-300 hover:text-orange-400'>📞0858-71-1020</a><br />
                日時：（水・金）17:30～19:30のうち 各90分授業<br />
                <br />
                アクセス方法はコチラを参照してください<br />
                来られる方は、お電話もしくは来所にてご予約ください<br />
                <a href='tel:0857328482' className='text-orange-300 hover:text-orange-400'>📞0857-32-8482</a><br />
                <br />
                <br />
                人生は出会いだ。<br />
                いつ誰に会うかで、その先が変わる。<br />
                そして勉強は、いつ誰に教わるかで、進路が変わる。<br />
                進む学校が違えば、会う人も異なり、自分の将来も変わってくる。<br />
                <br />
                <br />
                では、どういう人に出会えば良いのか。<br />
                それは、自分の未来を切り開いてくれる人。<br />
                今の自分に何が欠けていて、どこを補えば今の課題が解決するか。<br />
                明確に示してくれる人だ。<br />
                <br />
                <br />
                その場だけ楽しめればいい。<br />
                この瞬間だけ良ければいい。<br />
                そうやって逃げ続けても、先はない。<br />
                問題を先送りしているだけだから。<br />
                解決しないまま、何も変わらない。<br />
                大変な今から逃げないこと。<br />
                現実と向き合い、課題を克服する力をつけること。<br />
                一度、楽な道を選んだら後戻りできない。<br />
                楽したい人は、楽させてくれる人を選び、現実逃避し続けるから。<br />
                <br />
                <br />
                自分を変えたければ、まず課題を明らかにする。<br />
                「応用問題が解けない」という相談をよく聞くが、<br />
                テストを見ると、そういう人ほど基本問題を間違えている。<br />
                「勉強に集中できない」という相談も多いが、<br />
                話を聞くと、部活や人間関係などで悩み、勉強時間に別のことを考えている。<br />
                悩みが多すぎて、何に悩んでいるか分からないことも少なくない。<br />
                <br /> 
                <br />
                問題を整理し、優先順位をつけて解決する。<br />
                未来を良くしたければ、今に向き合う。<br />
                逃げたら、過去しかない人生になるから。<br />
                自分の人生に責任を持つ。<br />
                人のせいにする自分から、もう逃げない。<br />
            </>
        ),
        pjName_Jpn:"にっしん館",
        pjName_Eng:"Nishinn juku",
        popupLinks: [
            "./images/activities/nishin/nishin1.webp",
            "./images/activities/nishin/nishin2.webp",
            "./images/activities/nishin/nishin3.webp",
            "./images/activities/nishin/nishin4.webp",
            "./images/activities/nishin/nishin5.webp",
            ]
    },
};

export default activityContent;