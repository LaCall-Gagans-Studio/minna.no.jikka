import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    type: number;
    rev?: { 
        isRev: boolean;
        numCapN?: number;
        numCapH?: number;
    };
}

const RevAdmin = () => {
    const [events, setEvents] = useState<any>([]);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [subCollectionData, setSubCollectionData] = useState<DocumentData[]>([]);
    const [editEvent, setEditEvent] = useState<any>(null);
    const [newEvent, setNewEvent] = useState<any>({
        title: '', 
        start: '', 
        end: '', 
        type: 0,
        rev: { 
            isRev: false,
            numCapN: 0,
            numCapH: 0,
        }
    });
    // 編集用の状態
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    
    //Google Login処理
    const signInWithGoogle = async () => {
        //const provider = new GoogleAuthProvider();
        try {
            //await signInWithPopup(auth, provider);
            fetchData(); // 認証後、Firestoreからデータを取得
        } catch (error) {
            console.error(error); // エラーハンドリング
        }
    };

    //Firestore メインコレクション取得処理
    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            const eventsData = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
                id: doc.id,
                ...doc.data()
            })) as Event[];
            setEvents(eventsData);
        } catch (error) {
            console.error("アクセス権限がありません。", error);
        }
    };

    //Firestore サブコレクション取得処理
    const fetchSubCollection = async (eventId: string) => {
        setSelectedEventId(eventId); // 選択されたイベントIDをセット
        try {
            const subCollectionRef = collection(db, `events/${eventId}/participantsN`);
            const querySnapshot = await getDocs(subCollectionRef);
            const subData = querySnapshot.docs.map(doc => doc.data());
            setSubCollectionData(subData);
        } catch (error) {
            console.error("サブコレクションのデータ取得に失敗しました。", error);
        }
    };

    // イベント削除処理
    const deleteEventFromFirestore = async (eventId: string) => {
        // ユーザーに削除確認を求める
        const confirmDelete = window.confirm("本当にこのイベントを削除しますか？予約システムをONにしていた場合、予約の情報も丸ごと消えます。");
        if (confirmDelete) { // ユーザーがOKを選択した場合
            try {
                await deleteDoc(doc(db, "events", eventId));
                fetchData(); // データを再取得してリストを更新
            } catch (error) {
                console.error("イベントの削除に失敗しました。", error);
                alert("イベントの削除に失敗しました。"); // エラー通知
            }
        } else {
            // ユーザーがキャンセルを選択した場合、何もしない
        }
    };

    const handleFormSubmit = async (event:any) => {
        event.preventDefault();
        try {
            if (isEditing) {
                await updateDoc(doc(db, "events", editEvent.id), editEvent);
            } else {
                await addDoc(collection(db, "events"), newEvent);
            }
            alert("イベントが正常に追加/更新されました。");
            setShowForm(false); // フォームを閉じる
            setIsEditing(false); // 編集状態をリセット
            fetchData();
        } catch (error) {
            console.error("フォームの送信に失敗しました。", error);
        }
    };

    return (
        <div className='body mt-20 bg-white h-[100vh] w-full text-black'>
            <button onClick={signInWithGoogle} className=''>Googleでサインイン</button>
            <button onClick={() => { setShowForm(true); setIsEditing(false); }}>イベント追加</button>
            {showForm && (
                <EventForm 
                    event={isEditing ? editEvent : newEvent} 
                    setEvent={isEditing ? setEditEvent : setNewEvent}
                    onClose={() => setShowForm(false)} // 閉じる関数を渡す
                    onSubmit={handleFormSubmit} 
                />
            )}
            {!selectedEventId && (
                <ul className='w-[80vw] mx-auto'>
                    {events.map((event: Event) => {
                        const { bgColor, text } = getEventTypeDetails(event.type);
                        return (
                        <li className='flex w-full justify-between items-center border-2 rounded-sm'>
                            <div key={event.id} onClick={() => fetchSubCollection(event.id)} className="flex w-full h-14 items-center">
                                <p style={{ backgroundColor:bgColor}} className="text-white mx-4 w-28 text-center">{text}</p>
                                <p className='mx-4'>{event.title}</p>
                                <p className='mx-4 ml-auto'>{formatDateTime(event.start)} ~ {formatDateTime(event.end)}</p>
                            </div>
                            <button onClick={() => { setIsEditing(true); setEditEvent({...event}); setShowForm(true); }} className='ml-8 mr-4 w-16 h-10 bg-green-500 text-white rounded-sm'>編集</button>
                            <button onClick={() => deleteEventFromFirestore(event.id)} className='mr-4 ml-2 w-16 h-10 bg-black text-white rounded-sm'>削除</button>
                        </li>
                        );
                    })}
                </ul>
            )}
            {selectedEventId && (
                <div>
                    <button onClick={() => setSelectedEventId(null)}>戻る</button>
                    <h3>サブコレクションのデータ:</h3>
                    <ul>
                        {subCollectionData.map((data, index) => (
                            <li key={index}>
                                {JSON.stringify(data)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RevAdmin;

// EventForm コンポーネント
const EventForm = ({ event, setEvent, onSubmit, onClose }: { event: any; setEvent: any; onSubmit: any; onClose: any }) => {
    return (
        <div className='bg-gray-400 fixed z-50 top-1/2-translate-y-1/2  w-[80vw] h-[70vh] overflow-y-scroll flex flex-col left-1/2 -translate-x-1/2 border px-16'>
            <button onClick={onClose} className='self-end p-2 m-2 bg-white border rounded-lg my-2 mx-6 items-center'>閉じる</button>
            <label className='mt-2'>▼イベント名</label>
            <input className='mb-2' type="text" placeholder="タイトル" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
            <label className='mt-2'>▼日程</label>
            <div className='flex mt-2 mb-2'>
                <input type="datetime-local" placeholder="開始時間" value={event.start} onChange={(e) => setEvent({ ...event, start: e.target.value })} />
                <p>～</p>
                <input type="datetime-local" placeholder="終了時間" value={event.end} onChange={(e) => setEvent({ ...event, end: e.target.value })} />
            </div>
            <label className='mt-2'>▼開催主体（当法人の場合は"みんなの実家"）</label>
            <input className='mb-2' type="string" placeholder="ホスト" value={event.host} onChange={(e) => setEvent({ ...event, host: e.target.value })} />
            <label className='mt-2'>▼予約形態（一般開放 / 予約制 / 私的利用）</label>
            <input className='mb-2' type="number" placeholder="予約形態" value={event.rel} onChange={(e) => setEvent({ ...event, rel: Number(e.target.value) })} />
            <label className='mt-2'>▼紹介文</label>
            <div className='mb-2 h-auto w-full'>
                <textarea className='bg-white w-full' placeholder="紹介文" value={event.body} onChange={(e) => setEvent({ ...event, body: e.target.value })} />
            </div>
            <label className='mt-2'>▼イベント種別（利用不可 / みなよし食堂 / FSほとり / ひろば（公式） / ひろば（一般））</label>
            <input className='mb-2' type="number" placeholder="タイプ" value={event.type} onChange={(e) => setEvent({ ...event, type: Number(e.target.value)})}/>
            <label className='mt-2'>▼予約システムON / OFF</label>
            <input className='mr-auto' type="checkbox" checked={event.rev?.isRev || false} 
                onChange={(e) => setEvent({ ...event, rev: { ...(event.rev || {}), isRev: e.target.checked } })} />
                {event.rev?.isRev && (
                    <>
                        <label className='mt-2'>▼通常予約キャパシティ</label>
                        <input className='mb-2' type="number" placeholder="通常予約キャパシティ" value={event.rev.numCapN || ''} onChange={(e) => setEvent({ ...event, rev: { ...event.rev, numCapN: Number(e.target.value) || 0 } })} />
                        <label className='mt-2'>▼ほとりコードキャパシティ</label>
                        <input className='mb-2' type="number" placeholder="ほとりコードキャパシティ" value={event.rev.numCapH || ''} onChange={(e) => setEvent({ ...event, rev: { ...event.rev, numCapH: Number(e.target.value) || 0 } })} />
                    </>
                )}
            <button onClick={onSubmit} className='bg-white border rounded-lg text-xl mx-6 my-2 items-center'>送信</button>
        </div>
    );
};

// イベントタイプに応じた背景色とテキストを返す
const getEventTypeDetails = (type: number) => {
    switch (type) {
    case 0:
        return { bgColor: 'gray', text: '利用不可' };
    case 1:
        return { bgColor: '#FF5757', text: 'みなよし食堂' };
    case 2:
        return { bgColor: '#549D62', text: 'FSほとり' };
    case 3:
        return { bgColor: '#FDBA74', text: 'ひろば(公式)' };
    case 4:
        return { bgColor: '#FFBD59', text: 'ひろば(一般)' };
    default:
        return { bgColor: 'white', text: '未分類' };
    }
};

// ISO日時を指定されたフォーマットに変換
const formatDateTime = (isoDateTime: string) => {
    const date = new Date(isoDateTime);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('ja-JP', options);
};  