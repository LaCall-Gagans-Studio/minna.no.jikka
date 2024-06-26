import React from 'react';

// 建設中ページ
const Building = () => {
    return (
    <>
      <div className='bg-white h-svh w-full relative '>
        <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
          <img src="./gifs//building_hero.gif" className="w-44 lg:w-80 h-auto" alt="再読み込みしてください" />
          <p className='text-center mt-2 text-black text-nowrap overflow-visible'>このページは準備中です。<br />もう少しだけ、お持ちくださいね。</p>
          <p className='text-center text-sm mt-6 text-black'>みんなの実家より</p>
        </div>
      </div>
    </>
    )
    };


export default Building;