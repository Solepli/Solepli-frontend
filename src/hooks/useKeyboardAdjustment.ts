import { RefObject, useEffect, useLayoutEffect } from 'react';

export const useKeyboardAdjustment = (
  footerRef: RefObject<HTMLDivElement | null>
) => {
  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer || !window.visualViewport) return;

    const vv = window.visualViewport;

    //focus될 때 visualViewport에 맞춰 footer를 배치
    const whenOpenKeyboard = () => {
      footer.style.top = `${vv.height}px`;
    };

    //footer가 가장 하단으로 가게 변경
    const whenCloseKeyboard = () => {
      footer.style.top = `100dvh`;
    };

    document.addEventListener('focusout', whenCloseKeyboard);
    document.addEventListener('focusin', whenOpenKeyboard);

    return () => {
      document.removeEventListener('focusout', whenCloseKeyboard);
      document.removeEventListener('focusin', whenOpenKeyboard);
    };
  }, [footerRef]);

  //ios key 실행시 document 올라가는 것을 강제로 내림
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || !window.visualViewport) return;

    const controlScroll = () => {
      window.scrollTo(0, 1);
      const vv = window.visualViewport;
      if (!vv) return;
      footer.style.top = `${vv.height}px`;
    };

    document.addEventListener('scroll', controlScroll);

    return () => {
      document.removeEventListener('scroll', controlScroll);
    };
  }, [footerRef]);
};
