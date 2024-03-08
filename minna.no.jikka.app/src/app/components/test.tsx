"use client";
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const Test = ({}) => {
return (
    <div className="demo-app w-full h-full">
        <div className="demo-app-main w-full text-black">
            <FullCalendar
                timeZone={'local'}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin ]} // pluginsにtimeGridPluginを設定する
                initialView="timeGridWeek" // 初期表示のモードを設定する
                headerToolbar={{
                    left: 'title',
                    center: 'prev,today,next',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                }}
                slotDuration={'00:30:00'}
                slotLabelInterval={'01:00'}
                slotMinTime={'09:00:00'}
                slotMaxTime={'21:00:00'}
                navLinks={true}
                nowIndicator={true}
                locale={'ja'}
                contentHeight={'auto'}
                buttonText={{ month: '月表示', week: '週表示', day: '日表示' , list: 'リスト' }}
                events={'https://fullcalendar.io/api/demo-feeds/events.json'}
                allDaySlot={false}
            />
        </div>
    </div>
);
};

export default Test;