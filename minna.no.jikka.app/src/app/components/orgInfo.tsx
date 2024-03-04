import React from "react";

const OrgInfo = ({ item_name, item_text }) => (
    <div className="w-1/3 mt-4">
        <p className="text-neutral-400 text-xs font-medium leading-none">{item_name}</p>
        <p className="mt-3 text-black text-base font-light leading-normal">{item_text}</p>
        <hr className="border border-black"></hr>
    </div>
);

export default OrgInfo;