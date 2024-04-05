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
  4: '#FFBD59', //一般ひろば（薄黄）
};

const Calendar = () => {
  const [events, setEvents] = useState<any>([]);//Database用のイベントハンドラ
  const [showPopup, setShowPopup] = useState(false);//Popup用のハンドラ
  const [selectedEvent, setSelectedEvent] = useState<any>(null);//Popup用のハンドラ

  //Google Firestore処理
  useEffect(() => {
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchEventPromises = querySnapshot.docs.map(async (doc) => {
          // docData の取得とイベントオブジェクトの作成
          const docData = doc.data();
          
          return {
              title: docData.title,
              start: docData.start,
              end: docData.end,
              backgroundColor: typeToColorMap[docData.type] || 'white',
              extendedProps: {
                  body: 'BioChemistry',
                  isRev: docData.rev.isRev,//予約可能であるか
                  numCapacity_N: docData.rev.isRev ? docData.rev.numN : undefined, //一般予約の予約可能数を格納
                  numCapacity_H: docData.rev.isRev ? docData.rev.numH : undefined, //ほとりコードの予約可能数を格納
              }
          };
        });

        // すべてのイベントデータの取得が完了するのを待つ
        const fetchedEvents = await Promise.all(fetchEventPromises);
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
      numCapacity_N: clickInfo.event.extendedProps.numCapacity_N,
      numCapacity_H: clickInfo.event.extendedProps.numCapacity_H,
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
          <p>予約可能: <br />{selectedEvent.isRev}</p>
          <p>予約可能数: <br />{selectedEvent.numCapacity_N}</p>
          <button onClick={closePopup} className='absolute bottom-6 left-1/2 -translate-x-1/2 '>閉じる</button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
