import React, { useState, useEffect } from 'react';

const images = [
    "./images/hero/1.webp",
    "./images/hero/2.webp",
    "./images/hero/3.webp",
    "./images/hero/4.webp",
    "./images/hero/4.webp",
    "./images/hero/4.webp",
    "./images/hero/4.webp",
    "./images/hero/4.webp",
    "./images/hero/4.webp",
];
const images_num = 9;

const HeroSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images_num);
        }, 7000); // 3秒ごとに画像を切り替える

        return () => clearInterval(interval); // クリーンアップ
    }, []);

    return (
        <div className="Hero h-96 bg-gray-200 overflow-hidden relative">
        {images.map((image, index) => (
            <img
            key={index}
            src={`./images/hero/${index + 1}.webp`}
            className={`w-full h-full object-cover absolute transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            alt="スライドショー画像"
            />
        ))}
        </div>
    );
}

export default HeroSlideshow;
