import React, { useEffect, useState, lazy } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { FaTimes, FaHouseUser, FaRegCalendarAlt, FaTasks, FaShapes } from 'react-icons/fa';


const Calendar = () => {
  const [events, setEvents] = useState<any>([]);//Database用のイベントハンドラ
  const [showPopup, setShowPopup] = useState(false);//Popup用のハンドラ
  const [selectedEvent, setSelectedEvent] = useState<any>(null);//Popup用のハンドラ

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
      <div className='w-5/6 m-auto text-black'>
        <FullCalendar
          timeZone={'local'}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView='timeGridWeek'
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
            <div className='fixed top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 w-[50vw] h-auto p-12 bg-white shadow-lg border border-gray-200 z-50'>
              <div className='w-full h-56 overflow-y-scroll pl-4'>

                {/* タイトル */}
                <h1 className='text-3xl font-thin mb-4'>{selectedEvent.title}</h1>

                {/* 団体 */}
                <div className='mb-4 flex'>
                  <div className='rounded-lg border py-2 flex bg-orange-300 items-center'>
                    <FaHouseUser size={24} className='text-white ml-2'/>
                    <p className='ml-2 text-white pr-1'>主催団体</p>
                  </div>
                  <p className='py-2 ml-2'>{formatType(selectedEvent.type)}</p>
                </div>

                {/* 日程 */}
                <div className='mb-4 flex'>
                  <div className='rounded-lg border py-2 flex bg-orange-300'>
                    <FaRegCalendarAlt size={24} className='text-white ml-2'/>
                    <p className='ml-2 text-white pr-1'>日　程　</p>
                  </div>
                  <p className='py-2 ml-2'>{formatDate(new Date(selectedEvent.start))}</p>
                  <p className='py-2 mx-4'>～</p>
                  <p className='py-2'>{formatDate(new Date(selectedEvent.end))}</ p>
                </div>

                {/* 予約形態 */}
                <div className='flex mb-4'>
                  <div className='rounded-lg border py-2 flex bg-orange-300 items-center'>
                    <FaTasks size={24} className='text-white ml-2'/>
                    <p className='ml-2 text-white pr-1'>予約形態</p>
                  </div>
                  <p className='py-2 ml-2'>{formatRel(selectedEvent.rel)}</p>
                </div>
                
                {/* 詳細 */}
                <div className='flex mb-4'>
                  <div className='rounded-lg border py-2 flex bg-orange-300 items-center h-10'>
                    <FaShapes size={24} className='text-white ml-2'/>
                    <p className='ml-2 text-white pr-1'>詳　細　</p>
                  </div>
                  <p className='py-2 ml-2'>{selectedEvent.body}</p>
                </div>

              </div>
              <button onClick={() => { setShowPopup(false); }} className='absolute top-10 right-10'><FaTimes size={30} className='text-orange-300 hover:size-8 duration-200' /></button>
            </div>
            <div className='fixed top-0 left-0 bg-black backdrop-blur-3xl opacity-30 h-[100vh] w-[100vw] z-40'></div>{/* 黒背景 */}
          </>
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

//日付変更処理
const formatDate = (date:any) => {
  const optionsDate = { month: 'long', day: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedDate = date.toLocaleDateString('ja-JP', optionsDate);
  const formattedTime = date.toLocaleTimeString('ja-JP', optionsTime).slice(0, 5);
  return `${formattedDate} ${formattedTime}`;
};

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
      return '公式ひろばイベント';
    default:
      return (
        <>
          {type}
          <p className='text-xs text-slate-500'>みんなの実家の公式イベントではありません。ご注意ください。</p>
        </>
      );
  }
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