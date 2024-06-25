import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHouseUser, FaBasketballBall, FaRegNewspaper, FaRegLightbulb, FaFire, FaBullhorn } from 'react-icons/fa';
import { scroller } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';

const setNavLinks = [
    { id: 1, element: 'みんなの実家とは', icon: <FaHouseUser size={24} />, scrollTo: 'about', url: "/" },
    { id: 2, element: '活動', icon: <FaBasketballBall size={24} />, scrollTo: 'activities', url: "/" },
    { id: 3, element: 'ニュース', icon: <FaRegNewspaper size={24} />, scrollTo: 'news', url: "/" },
    { id: 4, element: 'プロフィール', icon: <FaRegLightbulb size={24} />, scrollTo: 'profile', url: "/" },
    { id: 5, element: '応援する', icon: <FaFire size={24} />, url: "/building" },
    { id: 6, element: 'お問い合わせ', icon: <FaBullhorn size={24} />, scrollTo: 'contact', url: "/" },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            scroller.scrollTo(location.state.scrollTo, {
                duration: 500,
                smooth: true,
                offset: -70, // Adjust for fixed header height
            });
        }
    }, [location]);

    const handleNavClick = (navLink: { id: number; element: string; icon: React.JSX.Element; scrollTo: string; url: string; } | { id: number; element: string; icon: React.JSX.Element; url: string; scrollTo?: undefined; }) => {
        if (navLink.url !== location.pathname) {
            navigate(navLink.url, { state: { scrollTo: navLink.scrollTo } });
        } else if (navLink.scrollTo) {
            scroller.scrollTo(navLink.scrollTo, {
                duration: 500,
                smooth: true,
                offset: -70,
            });
        }
        setIsOpen(false);
    };

    return (
        <div className="fixed w-full bg-orange-300 z-50 top-0 lg:flex lg:justify-between">
            <div className="flex justify-between items-center h-20 px-4 lg:w-1/4">
                <a href="/" className="flex items-center">
                    <div className='text-white text-xs text-right leading-none text-nowrap'>
                        <p>みんなで作る</p>
                        <p>みんなの居場所</p>
                    </div>
                    <h1 className="text-white text-xl ml-1 text-nowrap">みんなの実家</h1>
                </a>
                <button onClick={toggleMenu} className="text-white lg:hidden">
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            <div className={`flex flex-col lg:flex-row absolute lg:static w-full lg:w-auto lg:items-center lg:h-20 bg-orange-300 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-[100%]'} lg:translate-x-0`}>
                {setNavLinks.map((navLink) => (
                    <button
                        key={navLink.id}
                        onClick={() => handleNavClick(navLink)}
                        className="text-white text-lg text-nowrap p-4 hover:text-orange-200 transition duration-150 ease-in-out flex gap-2 items-center"
                    >
                        {navLink.icon} {navLink.element}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Header;
