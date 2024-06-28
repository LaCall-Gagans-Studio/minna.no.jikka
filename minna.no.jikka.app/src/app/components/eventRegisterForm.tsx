import React, { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';

const EventRegisterForm = ({ event, setEvent, onSubmit, onClose, isEditing }: { event: any; setEvent: any; onSubmit: any; onClose: any, isEditing: boolean }) => {
    const test = event.type? event.type: "none";

    const getInitialHost = (type: string) => {
        switch (type) {
            case '1':
                return 'hostOption1';
            case '2':
                return 'hostOption2';
            case '3':
                return 'hostOption3';
            case '0':
                return 'hostOption5';
            default:
                return 'hostOption4';
        }
    };

    const [host, setType] = useState<string>(getInitialHost(event.type));
    const [errors, setErrors] = useState<string[]>([]);
    const [repeatWeekly, setRepeatWeekly] = useState<boolean>(false);

    useEffect(() => {
        if (host === 'hostOption1') {
            setEvent({
                ...event,
                rev: {
                    ...(event.rev || {}),
                    isRev: true,
                    numCapN: event.rev?.numCapN || 0,
                    numCapH: event.rev?.numCapH || 0,
                },
                type: '1'
            });
        } else if (host === 'hostOption2') {
            setEvent({ ...event, rev: { ...(event.rev || {}), isRev: false }, type: '2' });
        } else if (host === 'hostOption3') {
            setEvent({ ...event, rev: { ...(event.rev || {}), isRev: false }, type: '3' });
        } else if (host === 'hostOption5') {
            setEvent({ ...event, rev: { ...(event.rev || {}), isRev: false }, type: '0' });
        } else {
            setEvent({ ...event, rev: { ...(event.rev || {}), isRev: false }, type: '4' });
        }
    }, [host, setEvent]);

    // 新しい useEffect を追加
    useEffect(() => {
        if (host === 'hostOption4') {
            setEvent({ ...event, type: event.type || '4' });
        }
    }, [host, setEvent]);

    const isTypeEditable = host === 'hostOption4';

    // エラー文
    const validateForm = () => {
        const newErrors: string[] = [];
        if (!event.title) newErrors.push('・イベント名を入力してください。');
        if (!event.start) newErrors.push('・開始時間を入力してください。');
        if (!event.end) newErrors.push('・終了時間を入力してください。');
        if (event.start && event.end && event.end.toMillis() <= event.start.toMillis()) {
            newErrors.push('・終了時間は開始時間より後に設定してください。');
        }
        if (!event.rel || event.rel === 0) newErrors.push('・予約形態を選択してください。');
        if (!event.body) newErrors.push('・紹介文を入力してください。');
        if (event.rev?.isRev && (!event.rev.numCapN || !event.rev.numCapH)) {
            newErrors.push('・予約可能人数を入力してください。');
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const getWeeklyEvents = (event: any) => {
        const startDate = event.start.toDate();
        const events = [];
        const currentMonth = startDate.getMonth();
        let nextDate = new Date(startDate);
    
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    
        while (nextDate.getMonth() === currentMonth) {
            if (nextDate.getTime() >= todayStart) {
                const newStart = new Date(nextDate);
                const newEnd = new Date(nextDate.getTime() + (event.end.toMillis() - event.start.toMillis()));
                const month = String(newStart.getMonth() + 1).padStart(2, '0');
                const day = String(newStart.getDate()).padStart(2, '0');
                const newEvent = {
                    ...event,
                    start: Timestamp.fromDate(newStart),
                    end: Timestamp.fromDate(newEnd),
                    date: `${month}${day}`
                };
                events.push(newEvent);
            }
            nextDate.setDate(nextDate.getDate() + 7);
        }

        return events;
    };     

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            if (repeatWeekly) {
                const weeklyEvents = getWeeklyEvents(event);
                onSubmit(weeklyEvents);
            } else {
                onSubmit([event]);
            }
        }
    };

    return (
        <div className='bg-gray-200 fixed z-50 top-28 w-[80vw] h-[80vh] overflow-y-scroll flex flex-col left-1/2 -translate-x-1/2 border px-16'>
            <button onClick={onClose} className='self-end p-2 m-2 bg-white border rounded-lg my-2 mx-6 items-center'>閉じる</button>

            {errors.length > 0 && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                    <strong className='font-bold'>入力エラー:</strong>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Title */}
            <label className='mt-2'>▼イベント名</label>
            <input className='mb-2' type='text' placeholder='タイトル' value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} autoFocus={true}/>

            {/* Start & End */}
            <label className='mt-2'>▼開催日時</label>
            <div className='flex gap-6'>
                <input 
                    type='datetime-local' 
                    placeholder='開始時間' 
                    value={event.start instanceof Timestamp ? new Date(event.start.toDate().getTime() - event.start.toDate().getTimezoneOffset() * 60000).toISOString().slice(0, -8) : event.start} 
                    onChange={(e) => {
                        const date = new Date(e.target.value);
                        const utcDate = new Date(date.getTime());
                        const month = String(utcDate.getMonth() + 1).padStart(2, '0');
                        const day = String(utcDate.getDate()).padStart(2, '0');
                        setEvent({
                            ...event,
                            start: Timestamp.fromDate(utcDate),
                            date: `${month}${day}`
                        });
                    }} 
                />
                <p>～</p>
                <input 
                    type='datetime-local' 
                    placeholder='終了時間' 
                    value={event.end instanceof Timestamp ? new Date(event.end.toMillis() + (9 * 60 * 60 * 1000)).toISOString().slice(0, -8) : event.end} 
                    onChange={(e) => {
                        const date = new Date(e.target.value);
                        const utcDate = new Date(date.getTime());
                        setEvent({
                            ...event,
                            end: Timestamp.fromDate(utcDate)
                        });
                    }} 
                />
            </div>

            {/* Repeat Weekly */}
            <label className={`mt-2 ${isEditing ? 'text-gray-500' : ''}`}>
                <input type='checkbox' checked={repeatWeekly} onChange={(e) => setRepeatWeekly(e.target.checked)} disabled={isEditing} /> 以降の各曜日に繰り返す（同月のみ）
            </label>

            {/* Host */}
            <label className='mt-2'>▼イベントの種別</label>
            <select className='mb-2' value={host} onChange={(e) => setType(e.target.value)} required>
                <option value='hostOption1'>みなよし食堂</option>
                <option value='hostOption2'>フリースクールほとり</option>
                <option value='hostOption3'>ひろば（公式）</option>
                <option value='hostOption4'>ひろば（一般）</option>
                <option value='hostOption5'>利用不可</option>
            </select>

            {/* numCapH & numCapN */}
            {event.rev?.isRev && (
                <div className='flex mt-2 mb-2'>
                    <div className='flex flex-col mr-8'>
                        <label className='mt-2'>▼通常キャパシティ</label>
                        <input className='mb-2' type='number' placeholder='通常キャパシティ' value={event.rev.numCapN || ''} 
                            onChange={(e) => 
                                setEvent({ 
                                    ...event, 
                                    rev: { ...event.rev, numCapN: Number(e.target.value) || 0 }
                                })} required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mt-2'>▼ほとりキャパシティ</label>
                        <input className='mb-2' type='number' placeholder='ほとりキャパシティ' value={event.rev.numCapH || ''} 
                            onChange={(e) => 
                                setEvent({ 
                                    ...event, 
                                    rev: { ...event.rev, numCapH: Number(e.target.value) || 0 }  
                                })} required />
                    </div>
                </div>
            )}

            {/* Type */}
            <label className={`mt-2 ${isTypeEditable ? '' : 'text-gray-500'}`}>▼主催｜ひろば（一般）の時のみ選択</label>
            <input
                className={`mb-2 ${isTypeEditable ? '' : 'bg-gray-200'}`}
                type='text'
                placeholder='種別'
                value={event.type}
                onChange={(e) => setEvent({ ...event, type: e.target.value })}
                disabled={!isTypeEditable}
                required
            />

            {/* Rel */}
            <label className='mt-2'>▼予約形態（一般開放 / 予約制 / 私的利用）</label>
            <select className='mb-2' value={event.rel} onChange={(e) => setEvent({ ...event, rel: Number(e.target.value) })} required>
                <option value={0}>選択してください</option>
                <option value={1}>一般開放</option>
                <option value={2}>予約制</option>
                <option value={3}>私的利用</option>
            </select>

            {/* Body */}
            <label className='mt-2'>▼紹介文</label>
            <div className='mb-2 h-auto w-full'>
                <textarea className='bg-white w-full' placeholder='紹介文' value={event.body} onChange={(e) => setEvent({ ...event, body: e.target.value })} required/>
            </div>

            <button onClick={handleSubmit} className='bg-white border rounded-lg text-xl mx-6 my-2 items-center'>公開する</button>
        </div>
    );
};

export default EventRegisterForm;
