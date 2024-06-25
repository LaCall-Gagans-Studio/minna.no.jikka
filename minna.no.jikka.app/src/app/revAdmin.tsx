import React, { useState } from 'react';
import { auth, db } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc, QueryDocumentSnapshot, DocumentData, Timestamp, query, where } from 'firebase/firestore';
import { formatTimestamp } from './components/formatTimestamp';
import EventRegisterForm from './components/eventRegisterForm';

interface Event {
    id: string,
    title: string;
    start: Timestamp;
    end: Timestamp;
    date: string;
    type: string;
    rev?: { 
        isRev: boolean;
        numCapN?: number;
        numCurN?: number;
        numCapH?: number;
        numCurH?: number;
    };
    rel: number;
    body?: string;
}

const initialEventState: Event = {
    id:'',
    title: '', 
    start: Timestamp.now(), 
    end: Timestamp.now(), 
    date: '',
    type: '0',
    rev: { 
        isRev: false,
        numCapN: 0,
        numCapH: 0,
        numCurN: 0,
        numCurH: 0,
    },
    rel: 0,
    body: ''
};

const RevAdmin = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);//ログイン状態
    const [events, setEvents] = useState<any>([]);//イベントデータ
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);//選択したイベントのID
    const [subCollectionData, setSubCollectionData] = useState<DocumentData[]>([]);//コレクションデータ
    const [eventDate, setEventDate] = useState<string | null>(null);//イベントの日付
    const [editEvent, setEditEvent] = useState<any>(null);//編集対象のイベント
    const [newEvent, setNewEvent] = useState<Event>(initialEventState);//追加対象のイベント

    //年月指定検索
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString().padStart(2, '0'));

    // 編集用の状態
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    //許可されたUID
    const allowedUIDs = [
        process.env.NEXT_PUBLIC_FIREBASE_CLIENT_UID,
        process.env.NEXT_PUBLIC_FIREBASE_STUDIO_UID
    ];
    
    // Google Login処理
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log('ユーザーUID:', user.uid); // デバッグ用ログ

            if (allowedUIDs.includes(user.uid)) {
                setIsSignedIn(true); // 認証成功後に状態を更新
                fetchData(); // 認証後、Firestoreからデータを取得
                console.error('認証に成功しました');
            } else {
                alert('指定されたユーザーではありません。ログインできません。');
                setIsSignedIn(false);
                auth.signOut();
            }
        } catch (error) {
            console.error('認証に失敗', error);
        }
    };

    //イベント取得処理
    const fetchData = async () => {
        try {
            const startOfMonth = new Date(`${selectedYear}-${selectedMonth}-01`);
            const endOfMonth = new Date(startOfMonth);
            endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    
            const startTimestamp = Timestamp.fromDate(startOfMonth);
            const endTimestamp = Timestamp.fromDate(endOfMonth);
    
            // Firestoreクエリを使用して特定の年月のイベントを取得
            const eventsQuery = query(
                collection(db, 'events'),
                where('start', '>=', startTimestamp),
                where('start', '<', endTimestamp)
            );
    
            const querySnapshot = await getDocs(eventsQuery);
            const eventsData = querySnapshot.docs
                .map((doc: QueryDocumentSnapshot<DocumentData>) => {
                    const data = doc.data() as Event;
                    return {
                        ...data,
                        id: doc.id // ドキュメントのIDを追加
                    };
                })
                .sort((a, b) => a.start.toMillis() - b.start.toMillis()); // 時系列にソート
    
            setEvents(eventsData);
        } catch (error) {
            console.error('メインコレクションのデータ取得に失敗しました。', error);
        }
    };

    //コレクション取得処理
    const fetchSubCollection = async (eventId: string) => {
        setSelectedEventId(eventId); // 選択されたイベントIDをセット
        try {
            // メインコレクションから"date"フィールドを取得
            const eventDoc = await getDoc(doc(db, 'events', eventId));
            if (eventDoc.exists()) {
                const eventData = eventDoc.data();
                setEventDate(eventData.date); // "date"フィールドを状態に設定
            } else {
                console.error('指定されたイベントは存在しません。');
                setEventDate(null);
            }
    
            const subCollectionRefs = [
                { ref: collection(db, `events/${eventId}/participantsN`), type: 'participantsN' },
                { ref: collection(db, `events/${eventId}/participantsH`), type: 'participantsH' }
            ];
    
            const results = await Promise.all(
                subCollectionRefs.map(async ({ ref, type }) => {
                    const querySnapshot = await getDocs(ref);
                    return querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                        type, // コレクションタイプを設定
                        notes: type === 'participantsH' ? 'スタッフ' : (doc.data().notes || '') // participantsHの場合は「スタッフ」と表示
                    }));
                })
            );
    
            const combinedData = results.flat();
            setSubCollectionData(combinedData);
        } catch (error) {
            console.error('サブコレクションのデータ取得に失敗しました。', error);
        }
    };     

    // イベント削除処理
    const deleteEventFromFirestore = async (eventId: string) => {
        const confirmDelete = window.confirm("本当にこのイベントを削除しますか？予約システムをONにしていた場合、予約の情報も丸ごと消えます。");
        if (confirmDelete) {
            try {
                const eventDocRef = doc(db, "events", eventId);
                await deleteDoc(eventDocRef);
                fetchData(); // データを再取得してリストを更新
            } catch (error) {
                console.error("イベントの削除に失敗しました。", error);
                alert("イベントの削除に失敗しました。"); // エラー通知
            }
        }
    };   
    
    // コレクション削除関数
    const deleteParticipant = async (eventId: string, docId: string, collectionType: string) => {
        console.log(eventId, docId, collectionType); // コンソールで確認
    
        try {
            await deleteDoc(doc(db, `events/${eventId}/${collectionType}`, docId));
            // 削除後にデータを再取得してリストを更新
            fetchSubCollection(eventId);
        } catch (error) {
            console.error('ドキュメントの削除に失敗しました。', error);
        }
    };

    //イベントフォーム処理
    const handleFormSubmit = async (events: Event[] | any[]) => {
        try {
            for (const event of events) {
                if (isEditing && editEvent && editEvent.id === event.id) {
                    await updateDoc(doc(db, 'events', editEvent.id), event);
                } else {
                    await addDoc(collection(db, 'events'), event);
                }
            }
            alert('イベントが正常に追加/更新されました。');
            setShowForm(false); // フォームを閉じる
            setIsEditing(false); // 編集状態をリセット
            setEditEvent(null); 
            setNewEvent(initialEventState); // フォームの状態を初期化
            fetchData();
        } catch (error) {
            alert('フォームの送信に失敗しましたやり直してください。');
            console.error('フォームの送信に失敗しました。', error);
        }
    };

    return (
        <div className='body mt-20 bg-white w-full text-black'>
            <h2 className='mx-auto text-center mt-6 pt-6 text-2xl no-print'>みんなの実家 管理者画面</h2>
            {isSignedIn ? (
                <>
                    {/* 新規追加&編集フォーム */}
                    {showForm && (
                        <EventRegisterForm 
                            event={isEditing ? editEvent : newEvent} 
                            setEvent={isEditing ? setEditEvent : setNewEvent}
                            onClose={() => setShowForm(false)} // 閉じる関数を渡す
                            onSubmit={handleFormSubmit} 
                            isEditing={isEditing}
                        />
                    )}

                    {/* 検索年月指定処理 */}
                    {!selectedEventId && (
                        <div className="mb-4 mx-auto py-6 text-center items-center">
                            <label htmlFor="year" className="mr-2">年:</label>
                            <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="mr-4">
                                {Array.from(new Array(10), (val, index) => new Date().getFullYear() - index).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <label htmlFor="month" className="mr-2">月:</label>
                            <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                {Array.from(new Array(12), (val, index) => (index + 1).toString().padStart(2, '0')).map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <button onClick={fetchData} className="ml-4 px-6 py-4 border rounded-sm bg-slate-100">イベントを取得</button>
                            <button onClick={() => { setShowForm(true); setIsEditing(false); setNewEvent(initialEventState); }} className='ml-4 px-6 py-4 border rounded-sm bg-slate-100'>イベントを新規追加する</button>
                        </div>
                    )}

                    {/* イベントリスト */}
                    {!selectedEventId && (
                        <ul className='w-[80vw] mx-auto'>
                            {events.length === 0 ? (
                                <div className='flex w-full justify-center items-center border-2 rounded-sm py-4'>
                                    <p className='text-gray-500'>イベントがありません</p>
                                </div>
                            ) : (
                                events.map((event: Event) => {
                                    const { bgColor, text } = getEventTypeColorDetails(event.type);
                                    return (
                                        <li key={event.id} className='flex w-full justify-between items-center border-2 rounded-sm'>
                                            <div className='flex w-full h-10 items-center'>
                                                <p style={{ backgroundColor: bgColor }} className='text-white text-xs mx-4 py-1 rounded-md text-center w-28 bg-opacity-70'>{text}</p>
                                                <p className='mx-2 text-nowrap'>{event.title}</p>
                                                <div className='flex justify-center w-2/5 ml-auto'>
                                                    <p className='mx-2 text-gray-500'>{formatTimestamp(event.start)}</p>
                                                    <p className='mx-2 text-gray-500'>～</p>
                                                    <p className='mx-2 text-gray-500'>{formatTimestamp(event.end)}</p>
                                                </div>
                                            </div>

                                            {event.rev && event.rev.isRev ? (
                                                <button onClick={() => fetchSubCollection(event.id)} className='text-sm mr-2 ml-1 w-12 h-7 bg-blue-500 bg-opacity-70 text-white rounded-sm'>予約</button>
                                            ) : (
                                                <div className='text-sm mr-2 ml-1 w-12 h-7'></div>
                                            )}
                                            <button onClick={() => { setIsEditing(true); setEditEvent({ ...event }); setShowForm(true); }} className='text-sm ml-2 mr-2 w-16 h-7 bg-green-600 bg-opacity-70 text-white rounded-sm'>編集</button>
                                            <button onClick={() => deleteEventFromFirestore(event.id)} className='text-sm mr-4 ml-2 w-16 h-7 bg-black text-white rounded-sm'>削除</button>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    )}

                    {/* コレクションリスト */}
                    {selectedEventId && (
                        <div className='w-[80vw] mx-auto'>
                            <div className='flex w-full justify-center mt-4'>
                                <button onClick={() => { window.print(); return false; }} className='no-print px-6 py-4 border rounded-sm bg-slate-100'>このページを印刷する</button>
                                <button onClick={() => setSelectedEventId(null)} className='no-print ml-4 px-6 py-4 border rounded-sm bg-slate-100'>戻る</button>
                            </div>
                            <h3 className='mx-auto text-lg '>▼{eventDate ? formatDateString(eventDate) : ''}の予約データ:</h3>
                            <table className='table-auto w-full border-collapse'>
                                <thead>
                                    <tr className='text-nowrap text-sm py-2 font-thin'>
                                        <th className='border px-5'>大人</th>
                                        <th className='border px-1'>子ども<br />（ふつう）</th>
                                        <th className='border px-1'>子ども<br />（少なめ）</th>
                                        <th className='border px-5'>乳児</th>
                                        <th className='border px-12'>名前</th>
                                        <th className='border w-auto'>備考</th>
                                        <th className='border px-2 no-print'>操作</th> {/* 追加：操作列 */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {subCollectionData.map((data, index) => {
                                        const [count1, count2, count3, count4] = data.count.split('.');
                                        return (
                                            <tr key={index} className='text-center'>
                                                <td className='border'>{count1 !== '0' ? count1 : ''}</td>
                                                <td className='border'>{count2 !== '0' ? count2 : ''}</td>
                                                <td className='border'>{count3 !== '0' ? count3 : ''}</td>
                                                <td className='border'>{count4 !== '0' ? count4 : ''}</td>
                                                <td className='border text-left pl-2'>{data.name}</td>
                                                <td className='border text-left pl-2'>{data.notes}</td>
                                                <td className='border no-print'>
                                                    <button onClick={() => deleteParticipant(selectedEventId, data.id, data.type)} className='text-red-500'>削除</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr className='text-center'>
                                        <td className='border font-bold'>{subCollectionData.reduce((sum, data) => sum + parseInt(data.count.split('.')[0]), 0)}</td>
                                        <td className='border font-bold'>{subCollectionData.reduce((sum, data) => sum + parseInt(data.count.split('.')[1]), 0)}</td>
                                        <td className='border font-bold'>{subCollectionData.reduce((sum, data) => sum + parseInt(data.count.split('.')[2]), 0)}</td>
                                        <td className='border font-bold'>{subCollectionData.reduce((sum, data) => sum + parseInt(data.count.split('.')[3]), 0)}</td>
                                        <td className='border text-left pl-2'>合計：<span className='font-bold'>{subCollectionData.reduce((sum, data) => sum + data.count.split('.').reduce((innerSum:number, count:string) => innerSum + parseInt(count), 0), 0)}</span></td>
                                        <td className='border w-full'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <div className='h-[70vh] w-full relative flex justify-center gap-5'>
                    <button onClick={signInWithGoogle} className='no-print mt-10 h-16 px-10 py-5 border rounded-sm bg-red-100'>Googleでサインイン</button>
                    <a href='/' className='no-print mt-10 h-16 px-10 py-5 border rounded-sm bg-red-100'>ホームに戻る</a>
                </div>
                
            )}
        </div>
    );
};

export default RevAdmin;

// イベントタイプに応じた背景色とテキストを返す
const getEventTypeColorDetails = (type: string) => {
    switch (type) {
    case '0':
        return { bgColor: 'gray', text: '利用不可' };
    case '1':
        return { bgColor: '#FF5757', text: 'みなよし食堂' };
    case '2':
        return { bgColor: '#549D62', text: 'FSほとり' };
    case '3':
        return { bgColor: '#FDBA74', text: 'ひろば(公式)' };
    default:
        return { bgColor: '#FFBD59', text: 'ひろば(一般)' };
    }
};

//MMDDをMM月DD日に直す
const formatDateString = (dateString: string) => {
    const month = dateString.slice(0, 2);
    const day = dateString.slice(2);
    return `${parseInt(month)}月${parseInt(day)}日`;
};