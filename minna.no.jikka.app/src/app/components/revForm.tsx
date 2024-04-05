import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const RevForm = () => {
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

        // Firestoreにデータを書き込む
        try {
        const docRef = doc(db, "events/K93OfTHRhkaq7TyOTbKk/participantsN", data.name);
        await setDoc(docRef, participantData);
        alert("データが正常に送信されました。");
        reset(); // フォームをリセット
        } catch (error) {
        console.error("データの送信に失敗しました: ", error);
        alert("データの送信に失敗しました。");
        }
    };

    // フォームのUI
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="name">氏名:</label>
            <input id="name" {...register('name')} required />
        </div>
        <div>
            <label htmlFor="email">メールアドレス:</label>
            <input type="email" id="email" {...register('email')} required />
        </div>
        <div>
            <label htmlFor="adult">大人:</label>
            <input type="number" id="adult" {...register('adult')} required />
        </div>
        <div>
            <label htmlFor="childNormal">子供(ふつう):</label>
            <input type="number" id="childNormal" {...register('childNormal')} required />
        </div>
        <div>
            <label htmlFor="childLow">子供(少なめ):</label>
            <input type="number" id="childLow" {...register('childLow')} required />
        </div>
        <div>
            <label htmlFor="baby">乳幼児:</label>
            <input type="number" id="baby" {...register('baby')} required />
        </div>
        <button type="submit">送信</button>
        </form>

);};

export default RevForm;

