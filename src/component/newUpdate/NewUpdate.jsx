import React, { useEffect, useRef } from 'react';
import NewUpdateCard from '../utils/NewUpdateCard';
import { useSelector } from 'react-redux';

function NewUpdate() {
  const newPosts = useSelector((state) => state.post.newPost);
  const scrollContainer = useRef(null);

  const { isLight } = useSelector((state)=>state.theme);

  useEffect(() => {
    const container = scrollContainer.current;
    let scrollInterval;
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          container.scrollTop = 0;
        } else {
          container.scrollTop += 1; 
        }
      }, 20); 
    };

    startAutoScroll();

    // Pause scrolling on mouse enter, resume on mouse leave
    container.addEventListener('mouseenter', () => clearInterval(scrollInterval));
    container.addEventListener('mouseleave', startAutoScroll);

    return () => {
      clearInterval(scrollInterval);
      container.removeEventListener('mouseenter', () => clearInterval(scrollInterval));
      container.removeEventListener('mouseleave', startAutoScroll);
    };
  }, []);

  return (
    <section className={`sticky ${isLight ? "bg-white border-slate-700" : "bg-slate-900 border-slate-600"} right-4 md:w-full h-[80vh] border-solid border-2 p-3 md:flex flex-col justify-between items-center`}>
      <div className={`w-full ${isLight ? "bg-blue-500" : "bg-blue-900"} p-2 rounded-sm text-white font-mono font-bolder text-xl text-center`}>
        New Update
      </div>
      <div
        className="new-update-scroll-container w-full overflow-hidden h-full max-h-full"
        style={{ overflowY: 'auto' }} // Ensure scrolling functionality
        ref={scrollContainer}
      >
        {newPosts.map((post) => (
          <NewUpdateCard
            key={post.id}
            id={post.id}
            thumbnail={post.thumbnail}
            title={post.title}
            category={post.category}
          />
        ))}
      </div>
    </section>
  );
}

export default NewUpdate;
