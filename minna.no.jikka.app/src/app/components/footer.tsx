import React from "react";

const Footer: React.FC = () => {
    return(
    <>
        <div className="w-full flex items-center h-16 absolute bg-white ">
            <div className="left-3 absolute text-neutral-400 text-xs font-thin"><a>プライバシーポリシー</a></div>
            <div className="right-3 absolute text-black text-xs font-thin"><p>©2024 - Minna no Jikka Developed by LaCall Gagan's</p></div>
        </div>
    </>
    );
};

export default Footer;