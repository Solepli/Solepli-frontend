import { useCallback, useEffect } from 'react';
import { SCALE_16_14 } from '../constants';

/* 
    커서 위치 기준 자동 스크롤 함수 오작동 발견하여 주석처리 하였습니다. 
    - ios 정상 / android 오류 
    - android에서 여러번 엔터를 누르면 커서가 화면 위로 계속해서 이동하는 오류
  */

// textarea 내부 기준 커서의 상대적 Y 좌표를 계산 (textarea에서 첫 번째 줄이면 커서의 상대적 Y 좌표는 0)
// const getCursorCoordinates = (textarea: HTMLTextAreaElement) => {
//   if (!textarea || textarea.selectionStart === null) return { y: 0 };

//   // textarea 내부 커서 위치를 알기 위해 실제 div를 hidden으로 복사
//   const hiddenDiv = document.createElement('div');
//   hiddenDiv.style.position = 'absolute';
//   hiddenDiv.style.visibility = 'hidden';
//   hiddenDiv.style.whiteSpace = 'pre-wrap';
//   [
//     'font-family',
//     'font-size',
//     'font-weight',
//     'font-style',
//     'letter-spacing',
//     'line-height',
//     'padding-top',
//     'padding-left',
//     'padding-right',
//     'padding-bottom',
//     'border-top-width',
//     'border-left-width',
//     'border-right-width',
//     'border-bottom-width',
//     'text-indent',
//     'white-space',
//     'word-wrap',
//     'word-break',
//     'box-sizing',
//     'margin-bottom',
//     'align-self',
//     'scale',
//     'transform-origin',
//     'width',
//   ].forEach((prop) => {
//     hiddenDiv.style.setProperty(
//       prop,
//       getComputedStyle(textarea).getPropertyValue(prop)
//     );
//   });
//   const textUpToCursor = textarea.value.substring(0, textarea.selectionStart);
//   hiddenDiv.textContent = textUpToCursor;
//   const cursorSpan = document.createElement('span'); // span이 커서 위치를 나타냄
//   cursorSpan.textContent = '|';
//   hiddenDiv.appendChild(cursorSpan);
//   document.body.appendChild(hiddenDiv);

//   // cursorY는 textarea 내부에서의 상대적 높이
//   const negativeBottomMargin = cursorSpan.offsetTop * (1 - SCALE_16_14);
//   const cursorY = cursorSpan.offsetTop - negativeBottomMargin - 1.75; // 1.75는 커서의 상대적 높이를 보정하기 위한 값

//   document.body.removeChild(hiddenDiv);

//   return { y: cursorY };
// };

export const useAutoResizeAndScroll = (
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
) => {
  // 길이 자동 조절 함수
  const handleResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    const emptySpace = textarea.scrollHeight * (1 - SCALE_16_14);
    textarea.style.marginBottom = `-${emptySpace}px`;
  }, [textareaRef]);

  // 커서 위치 기준 자동 스크롤 함수
  // const handleCursorScroll = useCallback(() => {
  //   /* 설명
  //     ('화면 기준'은 키보드 제외한 화면을 의미)
  //     경우 A : 커서가 화면 기준 (상단 + blankSpace * 2; 예| 위에서 두번째 줄 아래) 보다 위에 있으면 (blankSpace * 2) 밑에 위치되도록 스크롤,
  //     경우 B : 커서가 화면 기준 (하단 - blankSpace * 6.5; 예| 아래서 6.5 줄 위에) 보다 아래 있으면 (blankSpace * 6.5) 위에 위치되도록 스크롤,
  //     (모바일 기본 설정; IOS 기준) 커서가 화면을 아예 벗어나면 자동으로 가운데 위치되도록 스크롤
  //   */

  //   const textarea = textareaRef.current;
  //   if (!textarea) return;

  //   const { y: cursorRelativeY } = getCursorCoordinates(textarea); // textarea 기준, 커서의 상대적 y값 (y는 실수, y >= 0)
  //   const textareaRect = textarea.getBoundingClientRect(); // 화면 상단 기준 textarea의 상대적 y 값 (y는 실수) (화면 상단 아래는 양수, 화면 상단 위에는 음수)
  //   const visualViewport = window.visualViewport; // 키보드 제외 보이는 화면 height 값 (height는 실수, height >= 0)

  //   if (!visualViewport) return;

  //   const cursorAbsoluteY = window.scrollY + textareaRect.top + cursorRelativeY; // "전체 화면" 기준, 커서의 절대적 y값
  //   const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight); // 한 줄 높이

  //   if (cursorAbsoluteY < window.scrollY + lineHeight) {
  //     // 경우 A: 커서가 화면 상단 특정 영역보다 위에 있을 때
  //     const scrollAmount = cursorAbsoluteY - (window.scrollY + lineHeight * 2);
  //     window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  //   } else if (
  //     // 경우 B: 커서가 화면 하단 특정 영역보다 아래에 있을 때
  //     cursorAbsoluteY >
  //     window.scrollY + visualViewport.height - lineHeight * 6.5
  //   ) {
  //     const scrollAmount =
  //       cursorAbsoluteY -
  //       (window.scrollY + visualViewport.height - lineHeight * 6.5);
  //     window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  //   }
  // }, [textareaRef]);

  // 이벤트리스너 핸들러
  const handleInput = useCallback(() => {
    handleResize();
    // handleCursorScroll();
    // }, [handleResize, handleCursorScroll]);
  }, [handleResize]);

  // 이벤트리스너 핸들러
  // const handleKeyUp = useCallback(
  //   (event: KeyboardEvent) => {
  //     const navigationKeys = [
  //       'ArrowUp',
  //       'ArrowDown',
  //       'ArrowLeft',
  //       'ArrowRight',
  //       'Home',
  //       'End',
  //       'PageUp',
  //       'PageDown',
  //     ];
  //     if (navigationKeys.includes(event.key)) {
  //       handleCursorScroll();
  //     }
  //   },
  //   [handleCursorScroll]
  // );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.addEventListener('input', handleInput);
    // textarea.addEventListener('keyup', handleKeyUp);

    return () => {
      textarea.removeEventListener('input', handleInput);
      // textarea.removeEventListener('keyup', handleKeyUp);
    };
    // }, [textareaRef, handleInput, handleResize, handleKeyUp]);
  }, [textareaRef, handleInput, handleResize]);
};
