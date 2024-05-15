import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const ChairmanInfo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return(
        <div className="Relation-Leader flex flex-col items-center mt-12 w-full">
            <div className='flex rounded-3xl px-8 py-2 bg-gray-100 lg:bg-white shadow lg:shadow-transparent'>
                <h1 className="text-center text-black text-xl lg:text-2xl font-medium leading-loose">代表者プロフィール</h1>
                <button onClick={toggleMenu} className="text-black ml-2 lg:hidden z-10">
                        {isOpen ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}
                </button>
            </div>
            <div className={`duration-600 transition-all w-full flex flex-col items-center z-0 ${isOpen ? 'translate-y-0 h-auto opacity-100' : '-translate-y-[100%] h-0 opacity-0'} lg:translate-y-0 lg:h-auto lg:opacity-100`}>
                <div className="flex mt-6 flex-col lg:flex-row">
                    <div className="flex flex-col items-center">
                        <img className="w-96 h-40" src="https://via.placeholder.com/377x154" />
                        <h3 className="text-center text-black text-xl font-light leading-loose mt-4">津村 雄一 / Yuichi Tsumura</h3>
                        <h4 className="lg:text-left lg:ml-1 text-black text-lg font-light leading-tight mt-2">生い立ち</h4>
                        <p className="lg:ml-2 lg:text-left text-black text-sm font-light leading-none">鳥取大学大学院教育学研究科を修了後、<br />鳥取県内で14年間公立学校教員として勤務。<br />退職後、児童養護施設勤務や、<br />こども食堂学習支援ボランティアを経験して、<br />2022年に“みんなの実家”を設立した。</p>
                        <h4 className="lg:ml-1 lg:text-left text-black text-lg font-light leading-tight mt-2">好きな言葉</h4>
                        <p className="lg:ml-2 lg:text-left text-black text-sm font-light leading-none">志あるところに道は開ける</p>
                    </div>
                    <div className="mt-6 lg:mt-0 ml-3 lg:ml-8 items-center">
                        <h3 className="text-black text-sm lg:text-xl font-light leading-loose">代表からのメッセージ</h3>
                        <p className=" text-black text-xs lg:text-sm font-light leading-normal">2020年に任意団体「地域コミュニティらるらりら」を立ち上げ、<br />鳥取市内を中心に地域食堂“にじいろcafe”を開催し、食事提供や学習支援、各種イベントを開催してまいりました。<br />2022年には念願であった活動拠点“みんなの実家”を設立することができました。<br />『ともに笑う、ともに学ぶ、ともに生きる』をモットーに、<br />『みんなで作る、みんなの居場所』をめざして。<br />地域密着総合型サードプレイス事業を展開してまいりました。<br />みなよし食堂やフリースクールほとり、みんなの広場を軸にして活動しています。<br />地域の居場所となるように、そして様々な地域活動のハブ拠点となるように、職員一同尽力してまいりました。<br />少しずつではありますが来所される方が増え、みんなの実家の様々な活動を通して笑顔で過ごされる方が増えてきたと実感しています。<br />これも一重に、地域の皆様やボランティアスタッフの皆様、行政や企業の皆様のお力添えによるものとあらためて感謝申し上げます。<br />今後も引き続き、赤ちゃんから高齢者まで、誰でも気軽に立ち寄ることができ、様々な形で交流し、みんながつながっていく拠点として、<br />多くの方にこのみんなの実家をご活用いただきたいと思います。<br />ご支援とご協力よろしくお願い申し上げます。</p>
                        <img src="./images/index-relation-signature.webp" className="w-36 h-auto object-cover absolute right-6 lg:right-16" alt="logo" />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ChairmanInfo;