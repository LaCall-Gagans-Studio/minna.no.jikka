import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const typeToColorMap: { [key: number]: string } = { //背景色の変更
  0: 'gray', //利用不可（灰）
  1: '#FF5757', //みなよし食堂（赤）
  2: '#549D62', //FSほとり（緑）
  3: '#FDBA74', //公式ひろば（濃黄）
  4: '#FF5757', //一般ひろば（薄黄）
};

const Calendar = () => {
  const [events, setEvents] = useState<any>([]);//Database用のイベントハンドラ
  const [showPopup, setShowPopup] = useState(false);//Popup用のハンドラ
  const [selectedEvent, setSelectedEvent] = useState<any>(null);//Popup用のハンドラ

  //Google Firebase Database処理
  useEffect(() => {
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchedEvents = [];

        for (const doc of querySnapshot.docs) {
            const subCollectionRef = collection(db, `events/${doc.id}/participants`);
            const subCollectionSnapshot = await getDocs(subCollectionRef);
            const subCollectionCount = subCollectionSnapshot.size; // サブコレクション内のドキュメント数
            const docData = doc.data();
            const event = {
                title: docData.title,
                start: docData.start,
                end: docData.end,
                backgroundColor: typeToColorMap[docData.type] || 'white',
                extendedProps: {
                    body: 'BioChemistry',
                    isRev: subCollectionCount,
                    numCurrent: '', // 必要に応じて値をセット
                    numCapacity: '' // 必要に応じて値をセット
                }
            };
            fetchedEvents.push(event);
        }
        setEvents(fetchedEvents);
    };

    fetchData();
  }, []);


  //Popup処理
  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent({
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      body: clickInfo.event.extendedProps.body,
      isRev: clickInfo.event.extendedProps.isRev,
    });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full h-full">
      <div className="w-5/6 m-auto text-black">
        <FullCalendar
          timeZone={'local'}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'title',
            center: 'prev,today,next',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          stickyHeaderDates={true}
          slotDuration={'00:30:00'}
          slotLabelInterval={'01:00'}
          slotMinTime={'09:00:00'}
          slotMaxTime={'21:00:00'}
          navLinks={true}
          nowIndicator={true}
          locale={'ja'}
          contentHeight={'auto'}
          buttonText={{ today: '今日', month: '月表示', week: '週表示', day: '日表示', list: 'リスト' }}
          events={events} // ステートからイベントデータを読み込み
          allDaySlot={false}
          eventClick={handleEventClick}
        />
        {showPopup && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-[50vw] h-[80vh] p-12 bg-white shadow-lg border border-gray-200 transition-transform duration-1000 ease-out scale-95 hover:scale-100 z-10">
          <h1 className='text-3xl'>{selectedEvent.title}</h1>
          <p>開始時間: {selectedEvent.start.toString()}</p>
          <p>終了時間: {selectedEvent.end.toString()}</p>
          <p>詳細: <br />{selectedEvent.body}</p>
          <p>詳細: <br />{selectedEvent.isRev}</p>
          <button onClick={closePopup} className='absolute bottom-6 left-1/2 -translate-x-1/2 '>閉じる</button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
