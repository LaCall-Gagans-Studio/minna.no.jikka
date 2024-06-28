import React from 'react';
import { FaTimes, FaHouseUser, FaRegCalendarAlt, FaTasks, FaShapes } from 'react-icons/fa';

interface CalendarPopupProps {
    selectedEvent: any
    onClose: any
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({ selectedEvent, onClose }) => {
    return (
        <>
            <div className='fixed top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 w-[90vw] lg:w-[50vw] h-[50vh] lg:h-auto py-12 lg:p-12 bg-white shadow-lg border border-gray-200 z-50'>
                <div className='w-full h-11/12 overflow-y-scroll pl-4'>
                    {/* タイトル */}
                    <h1 className='text-3xl font-thin mb-4 text-wrap w-4/5'>{selectedEvent.title}</h1>
                    
                    {/* 団体 */}
                    <div className='mb-4 flex'>
                        <div className='text-nowrap rounded-lg border py-2 flex bg-orange-300 items-center'>
                            <FaHouseUser size={24} className='text-white ml-2'/>
                            <p className='text-sm lg:text-base ml-2 text-white pr-1'>主催団体</p>
                        </div>
                        <p className='py-2 ml-2'>{formatType(selectedEvent.type)}</p>
                    </div>

                    {/* 日程 */}
                    <div className='mb-4 flex'>
                        <div className='text-nowrap rounded-lg border py-2 flex bg-orange-300'>
                            <FaRegCalendarAlt size={24} className='text-white ml-2'/>
                            <p className='text-sm lg:text-base ml-2 text-white pr-1'>日　程　</p>
                        </div>
                        <p className='py-2 ml-2'>{formatDate(new Date(selectedEvent.start))}</p>
                        <p className='py-2 mx-4'>～</p>
                        <p className='py-2'>{formatDate(new Date(selectedEvent.end))}</ p>
                    </div>

                    {/* 予約形態 */}
                    <div className='flex mb-4'>
                        <div className='text-nowrap rounded-lg border py-2 flex bg-orange-300 items-center'>
                            <FaTasks size={24} className='text-white ml-2'/>
                            <p className='text-sm lg:text-base ml-2 text-white pr-1'>予約形態</p>
                        </div>
                        <p className='py-2 ml-2'>{formatRel(selectedEvent.rel)}</p>
                    </div>
                    
                    {/* 詳細 */}
                    <div className='flex mb-4'>
                        <div className='text-nowrap rounded-lg border py-2 flex bg-orange-300 items-center h-10'>
                            <FaShapes size={24} className='text-white ml-2'/>
                            <p className='text-sm lg:text-base ml-2 text-white pr-1'>詳　細　</p>
                        </div>
                        <p className='py-2 ml-2'>{selectedEvent.body}</p>
                    </div>
                </div>
                <button onClick={onClose} className='absolute top-10 right-10'>
                    <FaTimes size={30} className='text-orange-300 hover:size-8 duration-200' />
                </button>
            </div>
            <div className='fixed top-0 left-0 bg-black backdrop-blur-3xl opacity-30 h-[100vh] w-[100%] z-40'></div>{/* 黒背景 */}
        </>
    );
};

export default CalendarPopup;


//主催情報変換処理
const formatType = (type: any) => {
    switch (type) {
        case '0':
            return '利用不可';
        case '1':
            return 'みなよし食堂';
        case '2':
            return 'フリースクールほとり';
        case '3':
            return '公式イベント';
        default:
            return (
            <>
                {type}
                <p className='text-xs text-slate-500'>みんなの実家の公式イベントではありません。ご注意ください。</p>
            </>
            );
    }
};

//日付変更処理
const formatDate = (date:any) => {
    const optionsDate = { month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedDate = date.toLocaleDateString('ja-JP', optionsDate);
    const formattedTime = date.toLocaleTimeString('ja-JP', optionsTime).slice(0, 5);
    return `${formattedDate} ${formattedTime}`;
};

//予約形態変換処理
const formatRel = (type:number) => {
    switch (type) {
        case 1:
            return (
            <>
                一般開放
                <br />
                <p className='text-xs text-slate-500'>（予約不要です。気軽にお越しください！）</p>
            </>
            );
        case 2:
            return (
            <>
                事前予約制
                <br />
                <p className='text-xs text-slate-500'>（事前の予約が必要です。）</p>
            </>
            );
        case 3:
            return (
            <>
                参加不可
                <br />
                <p className='text-xs text-slate-500'>（私的な利用です。参加できません。）</p>
            </>
            );
        default:
            return ''
    }
};