import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import CalendarPopup from './calendarPopup';
import './calendar.css';

const Calendar = ({ }) => {

  const calendarRef = useRef<FullCalendar>(null);//calendar API
  const [events, setEvents] = useState<any>([]);//Database用のイベントハンドラ
  const [showPopup, setShowPopup] = useState(false);//Popup用のハンドラ
  const [selectedEvent, setSelectedEvent] = useState<any>(null);//Popup用のハンドラ
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>();//画面の大きさ

  // 画面サイズを監視し、状態を更新する
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize(); // 初回実行
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 再レンダリング時にビューを設定する
  useEffect(() => {
    changeView(isLargeScreen ? 'timeGridWeek' : 'timeGridThreeDay');
  }, [isLargeScreen]);

  //Google Firestore処理
  useEffect(() => {
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const fetchEventPromises = querySnapshot.docs.map(async (doc) => {
          // docData の取得とイベントオブジェクトの作成
          const docData = doc.data();
          
          return {
              title: docData.title,
              start: docData.start.toDate(), // FirestoreタイムスタンプをDateオブジェクトに変換
              end: docData.end.toDate(), // FirestoreタイムスタンプをDateオブジェクトに変換
              backgroundColor: typeToColorMap[docData.type] || '#FFBD59', //背景色を格納
              extendedProps: {
                id: doc.id,
              }
          };
        });

        // すべてのイベントデータの取得が完了するのを待つ
        const fetchedEvents = await Promise.all(fetchEventPromises);
        setEvents(fetchedEvents);
    };
    fetchData();
  }, []);

  // ビューを変更する関数
  const changeView = (viewName: string ) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(viewName);
    }
  };

  //Popup起動処理
  const handleEventClick = async (clickInfo: any) => {
    const docRef = doc(db, 'events', clickInfo.event.extendedProps.id); // ドキュメントIDを正しく指定
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const docData = docSnap.data();
      setSelectedEvent({
        title: clickInfo.event.title,
        start: clickInfo.event.start, // FirestoreタイムスタンプをDateオブジェクトに変換
        end: clickInfo.event.end, // FirestoreタイムスタンプをDateオブジェクトに変換
        type: docData.type,
        rel: docData.rel,
        body: docData.body || '詳細ナシ',
      });
    }
    setShowPopup(true);
  };

  return (
    <div className='w-full h-full'>
      <div className='w-5/6 m-auto mb-4 text-black'>
        <FullCalendar
          ref={calendarRef}
          timeZone={'local'}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView = 'timeGridThreeDay'
          headerToolbar={{
            left: 'title',
            center: 'prev,today,next',
            right: isLargeScreen ? 'dayGridMonth,timeGridWeek,timeGridDay,listMonth' : 'timeGridThreeDay,listMonth,',
          }}
          views={{
            timeGridThreeDay: {
              type: 'timeGrid',
              duration: { days: 3 }
            }
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
          buttonText={{ today: '今日', month: '月表示', week: '週表示', day: '日表示', list: 'リスト', timeGridThreeDay:'3日間' }}
          events={events} // ステートからイベントデータを読み込み
          allDaySlot={false}
          eventClick={handleEventClick}
        />
        {showPopup && (
          <CalendarPopup selectedEvent={selectedEvent} onClose={() => setShowPopup(false)} />
        )}
      </div>
    </div>
  );
};

export default Calendar;

//背景色の変更
const typeToColorMap: { [key: number]: string } = { 
  0: 'gray', //利用不可（灰）
  1: '#FF5757', //みなよし食堂（赤）
  2: '#549D62', //FSほとり（緑）
  3: '#FDBA74', //公式ひろば（濃黄）
};


