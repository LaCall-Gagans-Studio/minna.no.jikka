import React from "react";
import { Link} from 'react-router-dom';

const Footer: React.FC = () => {
    return(
    <>
        <div className="w-full flex flex-col lg:flex-row items-center h-16 absolute bg-white ">
            <div className="mt-4 lg:mt-0 ml-3 text-neutral-400 text-xs font-thin underline"><Link to={'/privacy'}>プライバシーポリシー</Link></div>
            <div className="ml-3 text-neutral-400 text-xs font-thin underline hidden lg:block"><Link to={'/admin'}>管理者ダッシュボード</Link></div>
            <div className="lg:right-3 lg:absolute text-black text-xs font-thin"><p>©2024 - <a href="/" className="underline">Minna no Jikka</a> Accelerated by <a href="/" className="underline">LaCall Gagan's</a></p></div>
        </div>
    </>
    );
};

export default Footer;