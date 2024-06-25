import { Timestamp } from 'firebase/firestore';

//DBのタイムスタンプを分かりやすい表記に変更するモジュール
export const formatTimestamp = (timestamp: Timestamp | undefined): string => {
    if (!timestamp) {
        return 'エラー';
    }
    const date = timestamp.toDate();
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return date.toLocaleDateString('ja-JP', options);
};