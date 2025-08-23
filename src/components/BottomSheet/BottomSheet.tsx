import React, { useRef } from 'react';
import {
  MAX_Y,
  MIN_Y,
  MID_Y,
  CATAGORY_MAX_Y,
  CATAGORY_MIN_Y,
  CATAGORY_MID_Y,
} from '../../constants';
import { useLocation } from 'react-router-dom';
import MapChipList from './Category/MapChipList';

const Header: React.FC<{
  children?: React.ReactNode;
  bottomSheetRef?: React.RefObject<HTMLDivElement | null>;
  mapChipListRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, bottomSheetRef }) => {
  const grabOffset = useRef(0);
  if (!bottomSheetRef) return <div></div>;

  const updateHeightFromTop = () => {
    const sheet = bottomSheetRef.current;
    if (!sheet) return;
    const rect = sheet.getBoundingClientRect();
    const newHeight = window.innerHeight - rect.top; // viewport bottom minus visual top
    sheet.style.height = `${newHeight}px`;
  };

  const moveBottomSheet = (clientY: number) => {
    const bottomSheet = bottomSheetRef.current;
    if (!bottomSheet) return;
    let newTop = clientY - grabOffset.current;
    if (newTop < 0) newTop = 0;
    if (newTop > MAX_Y) newTop = MAX_Y;
    bottomSheet.style.transform = `translateY(${newTop}px)`;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    console.log('pointer down', e.pointerType);
    const bottomSheet = bottomSheetRef.current;
    if (!bottomSheet) return;
    const rect = bottomSheet.getBoundingClientRect();
    grabOffset.current = e.clientY - rect.y;
    bottomSheet.style.height = `100dvh`;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const hasCapture = e.currentTarget.hasPointerCapture(e.pointerId);
    if (!hasCapture) return;
    console.log('pointer move', e.pointerType);
    moveBottomSheet(e.clientY);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    console.log('pointer up', e.pointerType);
    console.log(e.clientY);
    moveBottomSheet(e.clientY);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (!bottomSheetRef.current) return;
    if (e.clientY < MID_Y) {
      bottomSheetRef.current.style.transform = `translateY(${MIN_Y}px)`;
    } else if (e.clientY >= MID_Y && e.clientY < MAX_Y) {
      bottomSheetRef.current.style.transform = `translateY(${MID_Y}px)`;
    } else {
      bottomSheetRef.current.style.transform = `translateY(${MAX_Y}px)`;
    }
    updateHeightFromTop();
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={(e) => {
        console.log('pointer cancel', e.pointerType);
      }}
      className='touch-none select-none'>
      <div className='w-full h-20 py-8 inline-flex flex-col justify-center items-center bg-white z-100'>
        <div className='w-40 h-4 bg-gray-200 rounded-[10px]' />
      </div>
      <div>{children}</div>
    </div>
  );
};

const BottomSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isHeader = useRef(false);
  const isDragging = useRef(false);
  const pointerDownTarget = useRef<EventTarget | null>(null);
  const location = useLocation();

  const dragStartYRef = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const startScrollTopRef = useRef(0);
  const isFirstDownDrag = useRef(true);
  const isCategory = location.pathname === '/map';
  const isList = location.pathname === '/map/list';

  const MAX = isCategory ? CATAGORY_MAX_Y : MAX_Y;
  const MIN = isCategory ? CATAGORY_MIN_Y : MIN_Y;
  const MID = isCategory ? CATAGORY_MID_Y : MID_Y;

  const handlePointerDown = (e: React.PointerEvent) => {
    console.log(
      'handlePointerDown',
      e.pointerType,
      isDragging.current,
      pointerDownTarget.current
    );
    pointerDownTarget.current = e.target;
    // setDragStartY(e.clientY);
    dragStartYRef.current = e.clientY;
    if (contentRef.current) {
      startScrollTopRef.current = contentRef.current.scrollTop;
    }
    contentRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    console.log(
      'handlePointerMove',
      e.pointerType,
      isDragging.current,
      pointerDownTarget.current
    );
    const hasCapture = e.currentTarget.hasPointerCapture(e.pointerId);
    if (!hasCapture) return;
    const offset = dragStartYRef.current - e.clientY; //offset이 양수면 위로 드래그, 음수면 아래로 드래그
    // if (Math.abs(offset) < 10) return; // 드래그 감지 최소값
    console.log('offset', offset);
    if (!sheetRef.current) return;
    if (!contentRef.current) return;
    // console.log('offset', offset);
    if (offset > 0) {
      // Use absolute delta from the gesture start so we don't double-apply per frame
      const dy = e.clientY - dragStartYRef.current; // down:+ / up:-
      if (isFirstDownDrag.current) {
        console.log('first down drag');
        const el = contentRef.current;
        const max = Math.max(0, el.scrollHeight - el.clientHeight);
        let next = startScrollTopRef.current - dy; // move mouse up -> scroll up
        if (next < 0) next = 0;
        if (next > max) next = max;
        el.scrollTop = next;
        contentRef.current.style.touchAction = 'auto';
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    console.log(
      'handlePointerUp',
      e.pointerType,
      isDragging.current,
      pointerDownTarget.current
    );

    const offset = dragStartYRef.current - e.clientY; //offset이 양수면 위로 드래그, 음수면 아래로 드래그
    console.log('offset', offset);
    if (Math.abs(offset) < 10) return; // 드래그 감지 최소값
    if (!sheetRef.current) return;
    const nowTop = sheetRef.current?.getBoundingClientRect().top;
    console.log('nowTop', nowTop);
    console.log('MIN, MID, MAX', MIN, MID, MAX);
    // if (offset > 0 && nowTop === MAX) return; // MAX_Y일 때는 위로 드래그 불가
    // if (offset < 0 && nowTop === MIN) return; // MIN_Y일 때는 아래로 드래그 불가

    const initialPosition = nowTop;
    // Apply only when the visual position actually changes
    let nextSnap: number = nowTop;
    // if (offset > 0 && nowTop === MID) nextSnap = MIN;
    if (offset > 0 && nowTop === MAX) nextSnap = MID;
    else if (offset < 0 && nowTop === MID) nextSnap = MAX;
    else if (offset < 0 && nowTop === MIN) nextSnap = MID;

    const changed = nextSnap !== initialPosition;

    if (!contentRef.current) return;

    if (changed) {
      if (nextSnap === MIN) {
        contentRef.current.style.overflowY = 'auto';
        contentRef.current.style.touchAction = 'auto';
        isFirstDownDrag.current = true;
      }
      if (nextSnap === MID) {
        contentRef.current.style.overflowY = 'auto';
        contentRef.current.style.touchAction = 'none';
        isFirstDownDrag.current = true;
      }

      console.log('nextSnap', nextSnap);
      sheetRef.current!.style.transform = `translateY(${nextSnap}px)`;
      isFirstDownDrag.current = true;
      const rect = sheetRef.current.getBoundingClientRect();
      const newHeight = window.innerHeight - rect.top; // viewport bottom minus visual top
      sheetRef.current.style.height = `${newHeight}px`;
      console.log('changed height', sheetRef.current.style.height);
    } else {
      isFirstDownDrag.current = false;
    }

    if (
      e.pointerType === 'mouse' &&
      !isDragging.current &&
      pointerDownTarget.current
    ) {
      pointerDownTarget.current.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      );
    }

    pointerDownTarget.current = null;
    isHeader.current = false;
    isDragging.current = false;
    contentRef.current?.releasePointerCapture(e.pointerId);
  };

  const handleScroll = () => {
    if (!contentRef.current) return;
    if (contentRef.current.scrollTop === 0) {
      contentRef.current.style.touchAction = 'none';
      isFirstDownDrag.current = true;
    } else {
      contentRef.current.style.touchAction = 'auto';
    }
    console.log('content hidden', contentRef.current.style.overflowY);
  };

  return (
    <div
      ref={sheetRef}
      className={`fixed top-0 w-full bg-white rounded-t-2xl shadow-[0px_-1px_20px_0px_rgba(0,0,0,0.10)] z-50 touch-none select-none flex flex-col`}>
      {/* 드래그 핸들 */}
      <Header bottomSheetRef={sheetRef}>{isList && <MapChipList />}</Header>

      <div
        ref={contentRef}
        className={`flex-1 pb-100 touch-none`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onScroll={handleScroll}
        style={{ touchAction: 'none', overflowY: 'auto' }}>
        {/* BottomSheet 내용 */}
        {children}
      </div>
    </div>
  );
};
export default BottomSheet;
