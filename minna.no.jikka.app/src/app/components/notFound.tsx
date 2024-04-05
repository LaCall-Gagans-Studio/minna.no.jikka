import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// 404 ページコンポーネント
const NotFound = () => {
    const navigate = useNavigate();
    
      // コンポーネントがマウントされたら前のページに戻る
    React.useEffect(() => {
    navigate(-1); // 1つ前のページに戻る
    }, [navigate]);
    
      // または、特定の時間後に戻るようにすることも可能
      // React.useEffect(() => {
      //   setTimeout(() => {
      //     navigate(-1); // 3秒後に1つ前のページに戻る
      //   }, 3000);
      // }, [navigate]);
    
    return <div>ページが見つかりません。自動的に前のページに戻ります。</div>;
    };


export default NotFound;