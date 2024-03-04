"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { send } from '@emailjs/browser'

const ContactForm = () => {
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const submitMail = async (data) => {
        const serviceId = "service_51oqoi8" //process.env.REACT_APP_EMAILJS_SERVICE_ID; //ServeceIDを取得
        const templateId = "template_r8cidwr" //process.env.REACT_APP_EMAILJS_TEMPLATE_ID;// TemplateIDを取得
        const publicId = "hVaLgPuf2D4w2DB-B" //process.env.REACT_APP_EMAILJS_PUBLIC_ID; // Public Keyを取得
        
        try {
            await send(serviceId, templateId, data, publicId);
            setIsSubmittedSuccessfully(true); // 送信成功時に状態を更新
            setTimeout(() => setIsSubmittedSuccessfully(false), 5000); // 5秒後にポップアップを非表示にする
            } catch (error) {
            console.error("エラーが出ました" + error)
        }
    }
    
    return (
        <form onSubmit={handleSubmit(submitMail)} className="w-full relative mt-12 flex flex-col items-center justify-center bg-orange-300 bg-opacity-50">
            <h1 className="text-center text-black text-2xl font-medium leading-10 my-6">お問い合わせ</h1>
            <div className="w-3/4 flex my-6 justify-around">
                <p className="w-96 text-lg text-black">お名前</p>
                <div className="w-96 relative">
                    <textarea {...register("name", { required: true })} placeholder="みんなの太郎" className="text-black h-8 w-96 resize-none"/>
                    {errors.name && <span className="w-full text-red-400 absolute left-0 bottom-[-1rem]">文字を入力してください</span>}
                </div>
            </div>

            <div className="w-3/4 flex my-6 justify-around">
                <p className="w-96 text-lg text-black">メールアドレス</p>
                <div className="w-96 relative">
                    <textarea {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} placeholder="sample@gmail.com" className="text-black h-8 w-96 resize-none"/>
                    {errors.email && <span className="w-full text-red-400 absolute left-0 bottom-[-1rem]">正しいメールアドレスを入力してください</span>}
                </div>
            </div>

            <div className="w-3/4 flex my-6 justify-around">
                <p className="w-96 text-lg text-black">ご相談内容</p>
                <div className="w-96 relative">
                    <textarea {...register("detail", { required: true })} placeholder="内容を入力してください" className="text-black h-24 w-96 resize-y"/>
                    {errors.detail && <span className="w-full text-red-400 absolute left-0 bottom-[-1rem]">文字を入力してください</span>}
                </div>
            </div>

            <input type="submit" value="送信" className="cursor-pointer h-12 w-52 bg-orange-300 my-10 rounded-3xl shadow border-black flex justify-center items-center relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"/>
            {isSubmittedSuccessfully && (
                    <span className="fixed top-12 left-1/2 -translate-x-1/2 mb-2 px-4 py-2 shadow-md bg-white text-black rounded-lg ease-in-out duration-300">
                    送信が完了しました！
                    </span>
            )}
        </form>
    );
};

export default ContactForm;

