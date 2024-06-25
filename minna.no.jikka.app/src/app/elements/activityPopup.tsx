import React, { useState, useEffect, useRef } from 'react';
import activityContent from './activityContent';
import AnimationWrapper from "../components/animationWrapper";

interface ActivityPopupProps {
    type: string;
    popupContentId: string;
}

const ActivityPopup: React.FC<ActivityPopupProps> = ({ popupContentId, type }) => {
    const [showPopup, setShowPopup] = useState(false);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
    const [currentImage, setCurrentImage] = useState(0); 

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowPopup(true);
        }, 650); 
    };

    const handleMouseLeave = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        setShowPopup(false);
    };

    const content = activityContent[popupContentId] || <div>指定されたIDのテキストはありません。</div>;
    const images = content.popupLinks;

    const switchImage = (index: number) => {
        setCurrentImage(index);
    };
    
    useEffect(() => {
        let slideShowInterval: NodeJS.Timeout | null = null;
        if (showPopup) {
            slideShowInterval = setInterval(() => {
                setCurrentImage(prevIndex => (prevIndex + 1) % images.length);
            }, 6000);
        } else {
            if (slideShowInterval) {
                clearInterval(slideShowInterval);
            }
        }

        return () => {
            if (slideShowInterval) {
                clearInterval(slideShowInterval);
            }
        };
    }, [showPopup, images.length]);
    
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setShowPopup(true)} className="relative mt-6 lg:mt-8">
            {type === "main" ? (
                <AnimationWrapper animationType='fade-up'>
                    <div className="w-[80vw] lg:w-[23vw] h-auto bg-white lg:bg-gray-100 rounded-3xl shadow flex flex-row lg:flex-col items-center group hover:-translate-y-1 duration-500 hover:shadow-lg z-0">
                        <img src={`./images/activities/${popupContentId}/${popupContentId}_icon.webp`} className='ml-12 lg:ml-0 text-left lg:text-center w-16 h-16 lg:w-52 lg:h-52 my-3 lg:my-10' alt='読み込み失敗'></img>
                        <div className="ml-6 lg:ml-0 lg:w-52 lg:h-16 items-center">
                            <h3 className="text-left lg:text-center text-orange-300 text-sm lg:text-xl lg:font-bold leading-9">{content.pjName_Jpn}</h3>
                            <div className="w-4/5 h-px m-auto my-1 bg-gray-400 relative group-hover:w-full transition-all duration-700 ease-in-out before:absolute before:content-[''] before:rounded-full before:w-1 before:h-1 before:bg-gray-400 before:top-1/2 before:left-0 before:-translate-y-1/2 after:absolute after:content-[''] after:rounded-full after:w-1 after:h-1 after:bg-gray-400 after:top-1/2 after:right-0 after:-translate-y-1/2" />
                            <p className="text-left lg:text-center text-gray-400 text-xs lg:text-sm leading-tight">{content.pjName_Eng}</p>
                        </div>
                    </div>
                </AnimationWrapper>
            ) : (
                <AnimationWrapper animationType='scale-in-center'>
                    <div className="w-[35vw] lg:w-[23vw] h-auto lg:h-24 bg-white lg:bg-gray-100 rounded-lg lg:rounded-3xl shadow flex flex-col lg:flex-row items-center group hover:-translate-y-1 duration-500 hover:shadow-lg z-0">
                        <img src={`./images/activities/${popupContentId}/${popupContentId}_icon.webp`} className='lg:ml-12 w-10 h-10' alt='読み込み失敗'></img>
                        <div className='lg:ml-6 items-center'>
                            <h3 className="text-center lg:text-left text-orange-300 text-sm lg:text-lg lg:font-bold">{content.pjName_Jpn}</h3>
                            <div className="hidden lg:block w-4/5 h-px my-1 bg-gray-400 relative group-hover:w-full transition-all duration-700 ease-in-out before:absolute before:content-[''] before:rounded-full before:w-1 before:h-1 before:bg-gray-400 before:top-1/2 before:left-0 before:-translate-y-1/2 after:absolute after:content-[''] after:rounded-full after:w-1 after:h-1 after:bg-gray-400 after:top-1/2 after:right-0 after:-translate-y-1/2" />
                            <p className="hidden lg:block text-gray-400 text-sm">{content.pjName_Eng}</p>
                        </div>
                    </div>
                </AnimationWrapper>
            )}
            {showPopup && (
                <div className="fixed z-50 top-24 left-1/2 transform -translate-x-1/2 w-[90vw] lg:w-[80vw] h-[80vh] bg-white shadow-lg border border-gray-200 transition-transform duration-1000 ease-out scale-95 hover:scale-100 flex flex-col lg:flex-row">
                    <div className='h-1/3 lg:h-full w-full lg:w-7/12 bg-orange-300 flex items-center justify-center'>
                        <img src={images[currentImage]} alt="画像が読み込めません" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full justify-center mt-4 lg:absolute lg:bottom-5 lg:left-1/2 lg:transform lg:-translate-x-1/2 flex">
                        {images.map((_, index) => (
                            <span key={index} onClick={() => switchImage(index)}
                                className={`cursor-pointer block w-3 h-3 rounded-full mx-1 ${index === currentImage ? 'bg-orange-300' : 'bg-gray-300'}`}>
                            </span>
                        ))}
                    </div>
                    <div className='h-3/5 lg:h-auto w-full lg:w-5/12 pl-5 flex flex-col justify-rounded'>
                        <h1 className="lg:mt-12 text-black text-xl lg:text-4xl font-normal lg:leading-10">{content.pjName_Jpn}</h1>
                        <h3 className="mb-3 lg:mb-6 text-slate-500 text-sm lg:text-2xl font-normal leading-loose">{content.pjName_Eng}</h3>
                        <div className='text-black mr-0 lg:mr-6 text-sm lg:text-base h-full lg:h-auto overflow-y-scroll w-11/12'>
                            {content.description}
                        </div>
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default ActivityPopup;
