import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

interface OrgInfoProps {
    item_name: React.ReactNode;
    item_text: React.ReactNode;
}

const OrgInfo = () => {
    const EachOrgInfo: React.FC<OrgInfoProps> = ({ item_name, item_text }) => (
        <div className="w-3/4 lg:w-1/3 mt-4">
            <p className="text-neutral-400 text-xs font-medium leading-none">{item_name}</p>
            <p className="mt-3 text-black text-sm lg:text-base font-light leading-normal">{item_text}</p>
            <hr className="border border-black"></hr>
        </div>
    );

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return(
        <div className="Relation-Org flex flex-col items-center mt-12 overflow-hidden w-full">
            <div className='flex rounded-3xl px-8 py-2 bg-gray-100 lg:bg-white shadow lg:shadow-transparent'>
                <h1 className="text-center text-black text-xl lg:text-2xl font-medium leading-loose">法人情報</h1>
                <button onClick={toggleMenu} className="text-black ml-2 lg:hidden z-10">
                        {isOpen ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}
                </button>
            </div>
            <div className={`duration-600 transition-all w-full flex flex-col items-center z-0 ${isOpen ? 'translate-y-0 h-auto opacity-100' : '-translate-y-[100%] h-0 opacity-0'} lg:translate-y-0 lg:h-auto lg:opacity-100`}>
                <EachOrgInfo item_name="法人名" item_text="一般社団法人みんなの実家" />
                <EachOrgInfo item_name="設立日" item_text="2023年4月3日" />
                <EachOrgInfo item_name="事業内容" item_text={<>
                    (1)地域食堂事業<br />
                    (2)高齢者及び生活困窮者支援事業<br />
                    (3)不登校児童・生徒の支援事業<br />
                    (4)引きこもり支援事業<br />
                    (5)生活・就職及び福祉に関する相談対応事業<br />
                    (6)学習塾の経営及び訪問学習指導の運営事業<br />
                    (7)学習用図書・教材の開発及び販売に関する事業<br />
                    (8)スポーツ教室の企画・運営に関する事業<br />
                    (9)文化活動教室の企画・運営に関する事業<br />
                    (10)コンピュータ教室の企画・運営に関する事業<br />
                    (11)レンタルスペースの運営<br />
                    (12)農産物の生産（又は栽培）及び販売に関する事業<br />
                    (13)弁当・惣菜等の製造及び販売・配食サービス事業<br />
                    (14)その他前各号に附帯又は関連する事業<br />
                </>} />
                <EachOrgInfo item_name="所在地情報" item_text={<>〒680-0843 <br className="block lg:hidden"/>鳥取県鳥取市南吉方３丁目２１５番地</>}/>
                <EachOrgInfo item_name="連絡先情報" item_text={<>固　定　電　話：0857-32-8482<br/>メールアドレス：minna.no.jikka.2022@gmail.com</>} />
            </div>
        </div>
    );

}

export default OrgInfo;