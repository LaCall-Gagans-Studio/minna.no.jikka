"use client";
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const Calender = ({}) => {
return (
    <div className="demo-app w-full h-full">
        <div className="demo-app-main w-5/6 m-auto text-black">
            <FullCalendar
                timeZone={'local'}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin ]} // pluginsにtimeGridPluginを設定する
                initialView="timeGridWeek" // 初期表示のモードを設定する
                headerToolbar={{
                    left: 'title',
                    center: 'prev,today,next',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                }}
                stickyHeaderDates={true}
                slotDuration={'00:30:00'}//durationを30分毎に設定
                slotLabelInterval={'01:00'}//label間隔を1時間に定義
                slotMinTime={'09:00:00'}//開始時間を8時に設定
                slotMaxTime={'21:00:00'}//終了時間を21時に設定
                navLinks={true}
                nowIndicator={true}
                locale={'ja'}//日本語
                contentHeight={'auto'}
                buttonText={{ today: '今日', month: '月表示', week: '週表示', day: '日表示' , list: 'リスト' }}
                events={'https://fullcalendar.io/api/demo-feeds/events.json'}
                allDaySlot={false}
            />
        </div>
    </div>
);
};

export default Calender;