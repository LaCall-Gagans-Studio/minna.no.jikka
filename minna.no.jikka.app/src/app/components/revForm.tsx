import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../firebaseConfig';
import { doc, collection, addDoc, updateDoc, increment  } from 'firebase/firestore';

interface revFormProps {
    documentID: string;
    numRestN: number;
}

const RevForm: React.FC<revFormProps> = ({ documentID, numRestN }) => {
    // useFormを使用してフォームの状態を管理
    const { register, handleSubmit, reset } = useForm();

    // フォームのデータをFirebaseに送信する関数
    const onSubmit = async (data:any) => {
        const participantData = {
        name: data.name,
        email: data.email,
        num: {
            adult: Number(data.adult),
            childNormal: Number(data.childNormal),
            childLow: Number(data.childLow),
            baby: Number(data.baby),
        },
        };

        const totalEater = participantData.num.adult + participantData.num.childNormal + participantData.num.childLow; // 食事する人数

        if (totalEater > numRestN) {
            alert('予約可能数を超えています。');
            return;
        }

        // Firestoreにデータを書き込む
        try {
            // Firestoreに参加者データを書き込む
            const participantsCollectionRef = collection(db, `events/${documentID}/participantsN`);
            await addDoc(participantsCollectionRef, participantData);

            // 合計数を別のドキュメントに書き込む
            const eventDocRef = doc(db, `events/${documentID}`);
            await updateDoc(eventDocRef, { 'rev.numCurN': increment(totalEater) });

            alert("データが正常に送信されました。");
            reset(); // フォームをリセット
        } catch (error) {
            console.error("データの送信に失敗しました: ", error);
            alert("データの送信に失敗しました。");
        }
    };

    // フォームのUI
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='h-40 w-full bg-orange-300 flex flex-col items-center justify-center'>
            <div className='h-auto grid grid-cols-4 justify-center'>
                <div className='col-span-2'>
                    <label htmlFor="name">氏名:</label>
                    <input id="name" {...register('name')} className='border border-black bg-orange-200' required />
                </div>
                <div className='col-span-2'>
                    <label htmlFor="email">メールアドレス:</label>
                    <input type="email" id="email" {...register('email')} className='border border-black bg-orange-200' required />
                </div>
                <div className='col'>
                    <label htmlFor="adult">大人:</label>
                    <input type="number" min="0" value="0" id="adult" {...register('adult')} className='border border-black bg-orange-200 w-12' required />
                </div>
                <div className='w-'>
                    <label htmlFor="childNormal">子供(ふつう):</label>
                    <input type="number" min="0" value="0" id="childNormal" {...register('childNormal')} className='border border-black bg-orange-200 w-12' required />
                </div>
                <div className='w-'>
                    <label htmlFor="childLow">子供(少なめ):</label>
                    <input type="number" min="0" value="0" id="childLow" {...register('childLow')} className='border border-black bg-orange-200 w-12' required />
                </div>
                <div className='w-'>
                    <label htmlFor="baby">乳幼児:</label>
                    <input type="number" min="0" value="0" id="baby" {...register('baby')} className='border border-black bg-orange-200 w-12' required />
                </div>
            </div>
            <button type="submit">送信</button>
        </form>

);};

export default RevForm;

