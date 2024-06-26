import React, { useEffect, useState, useRef } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface Post {
  id: string;
  media_url: string;
  permalink: string;
}

const InstagramPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
  const businessId = process.env.NEXT_PUBLIC_INSTAGRAM_BUSINESS_ID;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://graph.facebook.com/v19.0/${businessId}?access_token=${accessToken}&fields=media.limit(21){permalink,media_url}`);
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          if (data && data.media && data.media.data) {
            setPosts(data.media.data);
          }
        } catch (error) {
          console.error('データの取得に失敗しました', error);
        }
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [posts]);

  return (
    <div ref={containerRef} className='my-2 lg:my-6 h-[44rem] flex flex-col flex-wrap gap-1 lg:gap-3 mx-4 lg:mx-12 justify-start overflow-x-scroll snap-x'>
      {posts.map(post => (
        <a key={post.id}  href={post.permalink} target="_blank" rel="noopener noreferrer" className='w-52 h-52 bg-neutral-50 snap-center'>
          <img src={post.media_url} alt={'Instagram post'} className="w-full h-full hover:opacity-45 duration-100 transition-all" />
        </a>
      ))}
      <a href="https://www.instagram.com/minna_no_jikka2022/" target="_blank" rel="noopener noreferrer" className='w-28 h-[648px] flex flex-col items-center justify-center bg-neutral-50 snap-center hover:bg-slate-300 duration-500'>
        <h2 className='text-black'>もっと見る</h2>
        <FaExternalLinkAlt size={18} className='text-black mt-2'/>
      </a>
    </div>
  );
};

export default InstagramPosts;
