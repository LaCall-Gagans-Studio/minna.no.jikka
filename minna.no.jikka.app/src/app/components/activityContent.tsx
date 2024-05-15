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
                （要予約/<a href="#" className="text-orange-300">カレンダー</a>もしくは<a href="#" className="text-orange-300">お電話</a>から）<br/>
                時間：火・水・金・土の11:30 ~14:00<br/>
                値段：18歳以下無料 / 大人300円
            </>
        ),
        pjName_Jpn:"みなよし食堂",
        pjName_Eng:"Minayoshi Community Cafe",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
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
                時間：月・火・木・金の10:00 ~15:00
                鳥取県認定フリースクール「ほとり」（2024.1.5認定）<br/>
                <br/>
                <br/>
                川のほとりにあるこじんまりとしたフリースクールです。<br/>
                古民家内で自分のペースで学習を進められます。<br/>
                教職経験者、塾指導経験者がサポートし、基礎学力の定着を目指します。<br/>
                プログラミング、調理実習、キャリア学習などの他にも、<br/>
                登山、BBQ、スキー＆スノボ研修、県外研修（２年に１回を予定）などの<br/>
                校外学習も楽しみながら過ごせます。<br/>
                <br/>
                <br/>
                <br/>
                <br/>
                ひとりひとりがほっとできる居場所であることはもちろんのこと、<br/>
                学校に通っていてもいなくても、<br/>
                学校復帰をしてもしなくても、<br/>
                社会に出たときに困らない力をつけるためのサポートをしていきたい。<br/>
                それが、スタッフ一同の思いです。<br/>
                <br/>
                <br/>
                <br/>
                【対象学年】 小学４年生～中学３年生<br/>
                【開校曜日】 月曜日、火曜日、木曜日、金曜日<br/>
                【開校時間】 10:00～14:40<br/>
                【　定員　】 ８名<br/>
                ※ガイダンス資料は、こちら　<br/>
                <br/>
                <br/>
                見学・体験希望の方は、事前にお電話にてご連絡ください。<br/>
                <p className='text-orange-300'>📞0857-32-8482（フリースクールほとり担当：小林）</p><br/>
            </>
        ),
        pjName_Jpn:"フリースクールほとり",
        pjName_Eng:"FreeSchool Hotori",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
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
                （要予約/<a href="#" className="text-orange-300">お電話</a>もしくは<a href="#" className="text-orange-300">こちら</a>から）<br/>
                例　：初心者が小説を書く会<br/>　　　当たらない占いを共に楽しむ集まり<br/>
                　　　セラピー＆ヨガ教室<br/>
                費用：無料
            </>
        ),
        pjName_Jpn:"みんなの広場",
        pjName_Eng:"Square for All",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
        ]
    },
    "danwa": {
        description: (
            <>
                赤ちゃんから高齢者の方まで。<br/>aaaaa
                誰でも気軽に参加できる地域食堂です。<br/>
                ご家族、お友達、おひとり様、どなたでも<br/>
                昼食をお楽しみいただけます。<br/>
                <br/>
                対象：どなたでも<br/>
                （要予約/<a href="#" className="text-orange-300">カレンダー</a>もしくは<a href="#" className="text-orange-300">お電話</a>から）<br/>
                時間：火・水・金・土の11:30 ~14:00<br/>
                値段：18歳以下無料 / 大人300円
            </>
        ),
        pjName_Jpn:"みんなの談話タイム",
        pjName_Eng:"Danwa Time",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
        ]
    },
    "engawa": {
        description: (
            <>
                赤ちゃんから高齢者の方まで。<br/>
                誰でも気軽に参加できる地域食堂です。<br/>
                ご家族、お友達、おひとり様、どなたでも<br/>
                昼食をお楽しみいただけます。<br/>
                <br/>
                対象：どなたでも<br/>
                （要予約/<a href="#" className="text-orange-300">カレンダー</a>もしくは<a href="#" className="text-orange-300">お電話</a>から）<br/>
                時間：火・水・金・土の11:30 ~14:00<br/>
                値段：18歳以下無料 / 大人300円
            </>
        ),
        pjName_Jpn:"通信スペースえんがわ",
        pjName_Eng:"Engawa High School",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
        ]
    },
    "residency": {
        description: (
            <>
                赤ちゃんから高齢者の方まで。<br/>
                誰でも気軽に参加できる地域食堂です。<br/>
                ご家族、お友達、おひとり様、どなたでも<br/>
                昼食をお楽しみいただけます。<br/>
            </>
        ),
        pjName_Jpn:"M(みんなの)レジデンシ!",
        pjName_Eng:"E-Residency for All",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
        ]
    },
    "vegetable": {
        description: (
            <>
                赤ちゃんから高齢者の方まで。<br/>
                誰でも気軽に参加できる地域食堂です。<br/>
                ご家族、お友達、おひとり様、どなたでも<br/>
                昼食をお楽しみいただけます。<br/>
            </>
        ),
        pjName_Jpn:"川べり野菜の家",
        pjName_Eng:"Riverside Vegetable Sta.",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
        ]
    },
    "supporter": {
        description: (
            <>
                赤ちゃんから高齢者の方まで。<br/>
                誰でも気軽に参加できる地域食堂です。<br/>
                ご家族、お友達、おひとり様、どなたでも<br/>
                昼食をお楽しみいただけます。<br/>
            </>
        ),
        pjName_Jpn:"みんサポ！",
        pjName_Eng:"Monthly Supporter",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
        ]
    },
    "nishin": {
        description: (
            <>
                赤ちゃんから高齢者の方まで。<br/>
                誰でも気軽に参加できる地域食堂です。<br/>
                ご家族、お友達、おひとり様、どなたでも<br/>
                昼食をお楽しみいただけます。<br/>
            </>
        ),
        pjName_Jpn:"にっしん館",
        pjName_Eng:"Nishinn juku",
        popupLinks: [
            "https://i.pinimg.com/564x/07/ae/c9/07aec943a8cc192f4a6320fe09ec3ba7.jpg",
            "https://i.pinimg.com/564x/42/b6/a8/42b6a854a99c9df623a5671a39151475.jpg",
            "https://i.pinimg.com/564x/bf/23/fa/bf23fa7be62c30bfcf98c6a4355b8eba.jpg",
            "https://i.pinimg.com/564x/e5/df/71/e5df71ede36c850dd77c8211af4cdb44.jpg",
            "https://i.pinimg.com/564x/76/38/a4/7638a4f8bc3e8bdc9877d32895714d2b.jpg"
        ]
    },
};

export default activityContent;