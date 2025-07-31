import { useRef } from 'react';
import SollectWriteContent from '../components/Sollect/SollectWrite/SollectWriteContent';
import SollectWriteImageInput from '../components/Sollect/SollectWrite/SollectWriteImageInput';

const SollectWritePage = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  //setTimeout을 이용해 항상 footer의 input Event가 먼저 반응할 수 있도록 함
  const vv = window.visualViewport;
  if (!vv) return <div>Visual viewport not supported</div>;

  const fullHeight = vv.height;
  // viewport가 변할 때 footer 위치 조정
  // chrome에서는 resize 이벤트가 즉시 반응함
  vv.addEventListener('resize', () => {
    setTimeout(() => {
      const contentHeight = contentRef.current;
      if (!contentHeight) return;
      if (vv.height >= fullHeight - 10) {
        contentHeight.style.height = `100dvh`; // Adjust footer position based on viewport height
      } else {
        // header와 footer를 제외한 영역의 높이를 조정
        contentHeight.style.height = `${vv.height - 95}px`; // Adjust footer position based on viewport height
        window.scrollTo(0, 1); // Scroll to the top to avoid keyboard overlap
      }
    }, 0);
  });

  //textarea focus/blur 시 footer 위치 조정
  //safari에서는 blur 이벤트가 즉시 반응함
  function focus() {
    setTimeout(() => {
      console.log('focus timeout');
      window.scrollTo(0, 1); // Scroll to the top to avoid keyboard overlap
      contentRef.current!.style.height = `${vv!.height - 95}px`; // Adjust height based on viewport
    }, 0);
  }
  function blur() {
    setTimeout(() => {
      contentRef.current!.style.height = `100dvh`; // Adjust height based on viewport
    }, 0);
  }
  return (
    <div className='w-full h-full flex flex-col'>
      <SollectWriteContent footerRef={footerRef} contentRef={contentRef} />
      <SollectWriteImageInput footerRef={footerRef} />
    </div>
  );
};

export default SollectWritePage;
