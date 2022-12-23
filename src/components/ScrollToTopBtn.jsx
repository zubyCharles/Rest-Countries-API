import { useState } from 'react';
import { BiChevronUp } from 'react-icons/bi';

const ScrollToTopBtn = () => {
  const [isVisible, setVisibility] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 375) {
      setVisibility(true);
    } else if (scrolled <= 375) {
      setVisibility(false);
    }
  };

  window.addEventListener('scroll', toggleVisibility);

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-[5%] right-[5%] z-50 w-[3rem] h-[3rem] rounded-[50%] grid place-items-center 
          bg-white dark:bg-slate-800 shadow shadow-slate-300 dark:shadow-[#111] transition-all hover:scale-95 cursor-pointer"
        >
          <BiChevronUp className="text-2xl dark:text-slate-200" />
        </div>
      )}
    </>
  );
};

export default ScrollToTopBtn;
