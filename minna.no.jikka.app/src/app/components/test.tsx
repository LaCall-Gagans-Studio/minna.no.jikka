import React, { useState } from 'react';
import { auth, db } from './../firebaseConfig';
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

const Test = () => {
    const [events, setEvents] = useState<any>([]);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [subCollectionData, setSubCollectionData] = useState<DocumentData[]>([]);
    const [showAddEventForm, setShowAddEventForm] = useState(false);
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

    //イベント削除処理
    const deleteEventFromFirestore = async (eventId: string) => {
        try {
            await deleteDoc(doc(db, "events", eventId));
            fetchData(); // データを再取得してリストを更新
        } catch (error) {
            console.error("イベントの削除に失敗しました。", error);
        }
    };

    // イベント追加フォーム処理
    const renderAddEventForm = () => {
        if (!showAddEventForm) return null;
        return (
            <div className='flex flex-col items-center'>
                <input type="text" placeholder="タイトル" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <input type="text" placeholder="開始時間" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} />
                <input type="text" placeholder="終了時間" value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} />
                <input type="number" placeholder="ホスト" value={newEvent.host} onChange={(e) => setNewEvent({ ...newEvent, host: e.target.value })} />
                <input type="number" placeholder="予約形態" value={newEvent.rel} onChange={(e) => setNewEvent({ ...newEvent, rel: e.target.value })} />
                <input type="text" placeholder="紹介文" value={newEvent.body} onChange={(e) => setNewEvent({ ...newEvent, body: e.target.value })} />
                <input type="number" placeholder="タイプ" value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value})}/>
                <input type="checkbox" placeholder="予約システムON" checked={newEvent.rev?.isRev || false} 
                    onChange={(e) => setNewEvent({ ...newEvent, rev: { ...(newEvent.rev || {}), isRev: e.target.checked } })} />
                    {newEvent.rev?.isRev && (
                        <>
                            <input type="number" placeholder="通常予約キャパシティ" value={newEvent.rev.numCapN} 
                                onChange={(e) => setNewEvent({ ...newEvent, rev: { ...newEvent.rev, numCapN: e.target.value } })} />
                            <input type="number" placeholder="ほとりコードキャパシティ" value={newEvent.rev.numCapH} 
                                onChange={(e) => setNewEvent({ ...newEvent, rev: { ...newEvent.rev, numCapH: e.target.value } })} />
                        </>
                    )}
                <button onClick={addEventToFirestore}>送信</button>
            </div>
        );
    };

    //イベント追加処理
    const addEventToFirestore = async () => {
        try {
            await addDoc(collection(db, "events"), newEvent);
            fetchData(); // データを再取得してリストを更新
            setShowAddEventForm(false); // フォームを非表示にする
            setNewEvent({ title: '', start: '', end: '', type: 0 }); // フォームをリセット
        } catch (error) {
            console.error("イベントの追加に失敗しました。", error);
        }
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

    // イベント編集フォームの表示
    const renderEditEventForm = () => {
        if (!selectedEventId) return null;
        const eventToEdit = events.find(event => event.id === selectedEventId);
        if (!eventToEdit) return null;

        // フォームの内容が変更されたときに呼ばれる関数
        const handleEditChange = (key, value) => {
            setNewEvent({ ...newEvent, [key]: value });
        };

        return (
            <div className='flex flex-col items-center'>
                <input type="text" placeholder="タイトル" value={newEvent.title || eventToEdit.title} onChange={(e) => handleEditChange('title', e.target.value)} />
                <input type="text" placeholder="開始時間" value={newEvent.start || eventToEdit.start} onChange={(e) => handleEditChange('start', e.target.value)} />
                // 他の編集可能なフィールドも同様に追加
                <button onClick={() => updateEventInFirestore(selectedEventId)}>更新</button>
            </div>
        );
    };

    // Firestoreにイベントの変更を保存
    const updateEventInFirestore = async (eventId) => {
        const eventRef = doc(db, "events", eventId);
        try {
            await updateDoc(eventRef, newEvent);
            fetchData(); // データを再取得してリストを更新
            setSelectedEventId(null); // 編集フォームを非表示にする
            setNewEvent({ title: '', start: '', end: '', type: 0 }); // フォームをリセット
        } catch (error) {
            console.error("イベントの更新に失敗しました。", error);
        }
    };

    return (
        <div className='body mt-20 bg-white h-96 w-full text-black'>
            <button onClick={signInWithGoogle} className=''>Googleでサインイン</button>
            <button onClick={() => setShowAddEventForm(true)}>イベント追加</button>
            {renderAddEventForm()}
            {!selectedEventId && (
                
                <ul className='w-[80vw] mx-auto'>
                    {events.map((event: Event) => {
                        const { bgColor, text } = getEventTypeDetails(event.type);
                        return (
                        <li className='flex w-full justify-between items-center'>
                            <div key={event.id} onClick={() => fetchSubCollection(event.id)} className="flex w-full h-14 items-center border-2">
                                <p style={{ backgroundColor:bgColor}} className="text-white rounded mx-4 w-28 text-center">{text}</p>
                                <p className='mx-4'>{event.title}</p>
                                <p className='mx-4 ml-auto'>{formatDateTime(event.start)} ~ {formatDateTime(event.end)}</p>
                            </div>
                            <button onClick={() => renderEditEventForm()} className='mx-8 w-10 h-10 bg-green-500 text-white'>変</button>
                            <button onClick={() => deleteEventFromFirestore(event.id)} className='mx-8 w-10 h-10 bg-black text-white'>削</button>
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

export default Test;
