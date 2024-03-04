import React from "react";

const LinkButton = ({ href, text }) => (
    <a href={href} className="h-12 w-52 bg-orange-300 my-10 rounded-3xl shadow border-black flex justify-center items-center relative after:content-['▷'] after:absolute after:right-5 after:top-1/2 after:-translate-y-1/2 transition-all after:duration-300 duration-300 hover:shadow-lg hover:-translate-y-1 after:hover:right-3">
        <div className="text-center text-white text-sm font-medium">{text}</div>
    </a>
);

export default LinkButton;