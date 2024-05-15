import React from "react";
import { FaAngleDoubleRight } from 'react-icons/fa';

interface LinkButtonProps {
    href: string; // hrefは文字列
    text: string; // textも文字列
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, text }) => (
    <a href={href} className="h-12 w-52 bg-orange-300 my-10 rounded-3xl shadow border-black flex justify-center items-center relative overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
        <div className="text-center text-white text-sm font-medium">{text}</div>
        <FaAngleDoubleRight className="absolute right-5 transition-all duration-300 group-hover:right-2" />
    </a>
);

export default LinkButton;
