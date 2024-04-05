import React from "react";

const setNavLinks: Array<{ text: string, url: string }> = [
    { text: "みんなの実家とは", url: "/" },
    { text: "活動", url: "/" },
    { text: "ニュース", url: "/" },
    { text: "プロフィール", url: "/" },
    { text: "応援する", url: "/" },
    { text: "お問い合わせ", url: "/" },
];

const Header = () => {
    return(
    <>
        <div className="fixed w-full flex items-center h-20 top-0 bg-orange-300 z-50">
            <a href="/" className="flex absolute left-4 items-center h-10">
                <div className="w-32  text-right text-white text-lg leading-none">みんなで作る<br/>みんなの居場所</div>
                <div className="w-52 text-white text-3xl pl-3">みんなの実家</div>
            </a>
            <div className="flex absolute right-0">
                {setNavLinks.map((navLink, index) => (
                    <div key={index} className={`px-9 ${index >= 0 && index < setNavLinks.length - 1 ? 'border-r border-white' : ''}`}>
                        <a key={index} href={navLink.url} className="text-white text-lg hover:text-orange-200 transition duration-150 ease-in-out">
                            {navLink.text}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
};

export default Header;