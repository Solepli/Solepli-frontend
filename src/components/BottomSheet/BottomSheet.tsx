import React, { useEffect, useRef } from 'react';
import { usePlaceStore } from '../../store/placeStore';
import { places } from '../../places';
import {
  MAX_Y,
  MIN_Y,
  MID_Y,
  CATAGORY_MAX_Y,
  CATAGORY_MIN_Y,
} from '../../constants';
import { useBottomSheetStore } from '../../store/useBottomSheetStore';
import { useLocation } from 'react-router-dom';
import MapChipList from './Category/MapChipList';

const Header: React.FC<{
  onPointerDown?: React.PointerEventHandler;
  children?: React.ReactNode;
  mapChipListRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ onPointerDown, children }) => {
  return (
    <div onPointerDown={onPointerDown} className='touch-none select-none'>
      <div className='w-full h-20 py-8 inline-flex flex-col justify-center items-center bg-white z-100'>
        <div className='w-30 h-4 bg-gray-200 rounded-[10px]' />
      </div>
      <div>{children}</div>
    </div>
  );
};

const BottomSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setPlaces = usePlaceStore((state)=>state.setPlaces);
    const sheetRef = useRef<HTMLDivElement>(null);
  const { snap, setSnap } = useBottomSheetStore();
  const [dragStartY, setDragStartY] = React.useState<number | null>(null);
  const [dragOffset, setDragOffset] = React.useState(0);
  const isHeader = useRef(false);
  const isDragging = useRef(false);
  const location = useLocation();
  const isCategory = location.pathname === '/map';
  const isList = location.pathname === '/map/list';

  // 카테고리일 때는 CATAGORY_MAX_Y로 초기화
  // 카테고리가 아닐 때는 MID_Y로 초기화
  useEffect(() => {
    setSnap(isCategory ? CATAGORY_MAX_Y : MID_Y);
  }, [isCategory, setSnap]);

  const MAX = isCategory ? CATAGORY_MAX_Y : MAX_Y;
  const MIN = isCategory ? CATAGORY_MIN_Y : MIN_Y;
  const MID = isCategory ? null : MID_Y;

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartY(e.clientY);
    sheetRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (snap === MAX && !isHeader.current && !isCategory) return; // MAX_Y일 때는 Header를 통해서만 드래그 가능(카테고리 제외)

    if (dragStartY !== null) {
      isDragging.current = true;
      const offset = dragStartY - e.clientY; //offset이 양수면 위로 드래그, 음수면 아래로 드래그
      if (Math.abs(offset) < 10) return; // 드래그 감지 최소값
      if (offset > 0 && snap === MAX) return; // MAX_Y일 때는 위로 드래그 불가
      if (offset < 0 && snap === MIN) return; // MIN_Y일 때는 아래로 드래그 불가
      setDragOffset(offset);
    }
  };

  const getNextSnap = (): number => {
    const finishY = window.innerHeight - (snap + dragOffset);

    // 위로 드래그
    if (dragOffset > 0 && snap < MAX) {
      if (!MID) return MAX; // MID가 없을 때는 MAX로 고정
      if (finishY <= MID) return MAX;
      if (finishY > MID) return MID;
    }

    // 아래로 드래그
    if (dragOffset < 0 && snap > MIN) {
      if (!MID) return MIN; // MID가 없을 때는 MIN으로 고정
      if (finishY >= MID) return MIN;
      if (finishY < MID) return MID;
    }

    return snap;
  };

  const handlePointerUp = () => {
    if (dragStartY !== null) {
      const nextSnap: number = getNextSnap();
      setSnap(nextSnap);
    }
    isHeader.current = false;
    isDragging.current = false;
    setDragStartY(null);
    setDragOffset(0);
  };
  useEffect(()=>{
    console.log(places);
    setPlaces(places);
  });

  const scrollableClass =
    snap === MAX && !isCategory ? 'overflow-y-auto' : 'overflow-hidden';

  return (
    <div
      ref={sheetRef}
      className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-[0px_-1px_20px_0px_rgba(0,0,0,0.10)] z-50 ${isDragging.current ? '' : 'transition-all duration-300'} touch-none select-none`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        height: `${MAX}px`,
        transform: `translateY(${MAX - (snap + dragOffset)}px)`,
      }}>
      {/* 드래그 핸들 */}
      <Header onPointerDown={() => (isHeader.current = true)}>
        {isList && <MapChipList />}
      </Header>

      <div className={`h-full pb-125 ${scrollableClass}`}>
        {/* BottomSheet 내용 */}
        {children}
      </div>
    </div>
  );
};
export default BottomSheet;
