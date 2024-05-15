import React, { useState } from 'react';
import { FaBars, FaTimes, FaHouseUser, FaBasketballBall, FaRegNewspaper, FaRegLightbulb, FaFire, FaBullhorn } from 'react-icons/fa';
import { Link } from 'react-scroll'

const setNavLinks = [
    { element: <div className='flex gap-3 border-l-2 lg:border-0 pl-3'><FaHouseUser size={24} /> みんなの実家とは</div>, url: "/" },
    { element: <div className='flex gap-3 border-l-2 lg:border-0 pl-3'><FaBasketballBall size={24} /> 活動</div>, url: "/" },
    { element: <div className='flex gap-3 border-l-2 lg:border-0 pl-3'><FaRegNewspaper size={24} /> ニュース</div>, url: "/" },
    { element: <div className='flex gap-3 border-l-2 lg:border-0 pl-3'><FaRegLightbulb size={24} /> プロフィール</div>, url: "/" },
    { element: <div className='flex gap-3 border-l-2 lg:border-0 pl-3'><FaFire size={24} /> 応援する</div>, url: "/" },
    { element: <div className='flex gap-3 border-l-2 lg:border-0 pl-3'><FaBullhorn size={24} /> お問い合わせ</div>, url: "/" },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="fixed w-full bg-orange-300 z-50 top-0 lg:flex lg:justify-between">
            <div className="flex justify-between items-center h-20 px-4 lg:w-1/4">
                <a href="/" className="flex items-center">
                    <div className='text-white text-xs text-right leading-none'>
                        <p>みんなで作る</p>
                        <p>みんなの居場所</p>
                    </div>
                    <h1 className="text-white text-xl ml-1">みんなの実家</h1>
                </a>
                <button onClick={toggleMenu} className="text-white lg:hidden">
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            <div className={`flex flex-col lg:flex-row absolute lg:static w-full lg:w-auto lg:items-center lg:h-20 bg-orange-300 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-[100%]'} lg:translate-x-0`}>
                {setNavLinks.map((navLink, index) => (
                    <a key={index} href={navLink.url} className="text-white text-lg p-4 hover:text-orange-200 transition duration-150 ease-in-out">
                        {navLink.element}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Header;
