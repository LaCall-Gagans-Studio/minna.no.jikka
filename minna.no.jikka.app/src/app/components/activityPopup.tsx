"use client";
import React, { useState, useEffect } from 'react';

const activityPopup = ({ pjName_Jpn, pjName_Eng, type, popupContent, popupLinks}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [currentImage, setCurrentImage] = useState(0); // スライドショーの現在の画像インデックス

    const handleMouseEnter = () => {
        // マウスが要素に入ったときにポップアップ表示のための遅延を設定
        const timeoutId = setTimeout(() => {
            setShowPopup(true);
        }, 650); // 700ミリ秒後にポップアップを表示
        setHoverTimeout(timeoutId);
    };

    const handleMouseLeave = () => {
        // マウスが要素から離れたときにポップアップ表示の遅延をクリア
        clearTimeout(hoverTimeout);
        setShowPopup(false);
    };

    // 画像のURLリスト
    const images = popupLinks;

    // 画像を切り替える関数
    const switchImage = (index) => {
        setCurrentImage(index);
    };

    // 自動で画像を切り替える機能
    useEffect(() => {
        let slideShowInterval;
        if (showPopup) {
            // ポップアップが表示されている場合、自動切り替えのタイマーを設定
            slideShowInterval = setInterval(() => {
                setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
            }, 6000); // 6秒ごとに次の画像に切り替える
        } else {
            // ポップアップが非表示の場合、タイマーをクリア
            if (slideShowInterval) {
                clearInterval(slideShowInterval);
            }
        }

        // コンポーネントのクリーンアップ時にタイマーをクリア
        return () => {
            if (slideShowInterval) {
                clearInterval(slideShowInterval);
            }
        };
    }, [showPopup, images.length]); // 依存配列にshowPopupとimages.lengthを指定


    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative w-[27%] mt-8">
            {type === "main" ? (
            // Main タイプのコンテンツ
            <a className="w-full h-96 bg-gray-100 rounded-3xl shadow flex flex-col items-center group hover:-translate-y-1 duration-500 hover:shadow-lg z-0">
                <div className="w-52 h-52 bg-zinc-300 my-10" />
                <div className="w-52 h-16 item-center">
                    <h3 className="text-center text-orange-300 text-xl font-bold leading-9">{pjName_Jpn}</h3>
                    <div className="w-4/5 h-px m-auto my-1 bg-gray-700 relative group-hover:w-full transition-all duration-700 ease-in-out before:absolute before:content-[''] before:rounded-full before:w-1 before:h-1 before:bg-gray-700 before:top-1/2 before:left-0 before:-translate-y-1/2 after:absolute after:content-[''] after:rounded-full after:w-1 after:h-1 after:bg-gray-700 after:top-1/2 after:right-0 after:-translate-y-1/2" />
                    <p className="text-center text-orange-300 text-sm leading-tight">{pjName_Eng}</p>
                </div>
            </a>
            ) : (
            // Sub タイプのコンテンツ
            <a className="w-full h-24 bg-gray-100 rounded-3xl shadow flex items-center group hover:-translate-y-1 duration-500 hover:shadow-lg z-0">
                <div className='ml-12 w-10 h-10 bg-zinc-300'></div>
                <div className='ml-6'>
                    <h3 className="text-orange-300 text-lg font-bold">{pjName_Jpn}</h3>
                    <div className="w-4/5 h-px my-1 bg-gray-700 relative group-hover:w-full transition-all duration-700 ease-in-out before:absolute before:content-[''] before:rounded-full before:w-1 before:h-1 before:bg-gray-700 before:top-1/2 before:left-0 before:-translate-y-1/2 after:absolute after:content-[''] after:rounded-full after:w-1 after:h-1 after:bg-gray-700 after:top-1/2 after:right-0 after:-translate-y-1/2" />
                    <p className="text-orange-300 text-sm">{pjName_Eng}</p>
                </div>
            </a>
            )}
            {showPopup && (
                <div className="fixed top-24 left-1/2 flex transform -translate-x-1/2 w-[80vw] h-[80vh] bg-white shadow-lg border border-gray-200 transition-transform duration-1000 ease-out scale-95 hover:scale-100 z-10">
                    <div className='h-full w-3/5 bg-orange-300 flex items-center justify-center'>
                        <img src={images[currentImage]} alt="画像が読み込めません" className="w-full h-full object-cover" />
                    </div>
                    <div className='h-full w-2/5 flex flex-col justify-rounded'>
                        <h1 className="ml-5 mt-24 text-black text-4xl font-normal leading-10">{pjName_Jpn}</h1>
                        <h3 className="ml-5 mt-0 text-black text-2xl font-normal leading-loose">{pjName_Eng}</h3>
                        <p className="ml-5 mt-16 text-black text-lg font-light leading-tight">{popupContent}</p>
                    </div>
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex">
                    {images.map((_, index) => (
                        <span key={index} onClick={() => switchImage(index)}
                            className={`cursor-pointer block w-3 h-3 rounded-full mx-1 ${index === currentImage ? 'bg-orange-300' : 'bg-gray-300'}`}>
                        </span>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default activityPopup;
