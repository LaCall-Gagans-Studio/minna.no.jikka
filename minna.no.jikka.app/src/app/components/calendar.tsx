import React, { useEffect, useState, lazy } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import RevForm from './revForm';
import { FaTimes } from 'react-icons/fa';

//const RevForm = lazy(() => import('./revForm'));

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
  const [showRevForm, setShowRevForm] = useState(false); // RevFormの表示制御用

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
              backgroundColor: typeToColorMap[docData.type] || 'white', //背景色を格納
              extendedProps: {
                  id: docData.id,
              }
          };
        });

        // すべてのイベントデータの取得が完了するのを待つ
        const fetchedEvents = await Promise.all(fetchEventPromises);
        setEvents(fetchedEvents);
    };

    fetchData();
  }, []);

  //Popup起動処理
  const handleEventClick = async (clickInfo: any) => {
    setShowRevForm(false);
    const docRef = doc(db, "events", clickInfo.event.extendedProps.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      setSelectedEvent({
        title: clickInfo.event.title,
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        id: clickInfo.event.extendedProps.id,
        body: docData.body || 'No details',
        isRev: docData.rev.isRev,
        numRestN: docData.rev ? docData.rev.numCurN ? docData.rev.numCapN - docData.rev.numCurN : docData.rev.numCapN : undefined,
      });
    }
    setShowPopup(true);
  };

  //Popup畳む処理
  const closePopup = () => {
    setShowPopup(false);
    setShowRevForm(false);
  };

  //日付変更処理
  const formatDate = (date:any) => {
    const optionsDate = { month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedDate = date.toLocaleDateString('ja-JP', optionsDate);
    const formattedTime = date.toLocaleTimeString('ja-JP', optionsTime).slice(0, 5);
    return `${formattedDate} ${formattedTime}`;
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
          <>
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-[50vw] h-[80vh] p-12 bg-white shadow-lg border border-gray-200 transition-transform duration-1000 ease-out scale-95 hover:scale-100 z-50">
              <div className='h-2/3 w-full'>
                <h1 className='text-3xl'>{selectedEvent.title}</h1>
                <p>開始時間: {formatDate(new Date(selectedEvent.start))}</ p>
                <p>終了時間: {formatDate(new Date(selectedEvent.end))}</ p>
                <p>詳細: <br />{selectedEvent.body}</p>
                {selectedEvent.isRev && (
                  <>
                    <p>残り予約可能数:{selectedEvent.numRestN}</p>
                  </>
                )}
                {selectedEvent.numRestN > 0 && (
                    <button onClick={() => setShowRevForm(true)} className=''>予約する</button>
                )}
              </div>
              {showRevForm && (
                <RevForm documentID={selectedEvent.id} numRestN={selectedEvent.numCapN} />
              )}
              <button onClick={closePopup} className='absolute top-10 right-10'><FaTimes size={30} className='text-orange-300 hover:size-8 duration-200' /></button>
            </div>
            <div className='fixed top-0 left-0 bg-black backdrop-blur-3xl opacity-30 h-[100vh] w-[100vw] z-40'></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;
