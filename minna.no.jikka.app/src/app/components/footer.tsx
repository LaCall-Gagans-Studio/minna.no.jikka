import React from "react";
import { Link} from 'react-router-dom';

const Footer: React.FC = () => {
    return(
    <>
        <div className="w-full flex items-center h-16 absolute bg-white ">
            <div className="ml-3 text-neutral-400 text-xs font-thin underline"><a>プライバシーポリシー</a></div>
            <div className="ml-3 text-neutral-400 text-xs font-thin underline"><Link to={'/admin'}>管理者ダッシュボード</Link></div>
            <div className="right-3 absolute text-black text-xs font-thin"><p>©2024 - Minna no Jikka Accelerated by by LaCall Gagan's</p></div>
        </div>
    </>
    );
};

export default Footer;