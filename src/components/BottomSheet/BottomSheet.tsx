// src/components/BottomSheet/BottomSheet.tsx
import React, { useRef } from 'react';
import { MAX_Y, MIN_Y, MID_Y, } from '../../constants';
import { useBottomSheetStore } from '../../store/useBottomSheetStore';

const Header: React.FC<{onPointerDown?: React.PointerEventHandler}> = ({onPointerDown}) => {
  return (
    <div 
    className='w-full h-20 py-8 inline-flex flex-col justify-center items-center'
    onPointerDown={onPointerDown}>
      <div className='w-30 h-4 bg-gray-200 rounded-[10px]' />
    </div>
  );
};

const BottomSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const { snap, setSnap } = useBottomSheetStore();
  const [dragStartY, setDragStartY] = React.useState<number | null>(null);
  const [dragOffset, setDragOffset] = React.useState(0);
  const isHeader = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartY(e.clientY);
    sheetRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (snap === MAX_Y && !isHeader.current) return; // MAX_Y일 때는 Header를 통해서만 드래그 가능
    if (dragStartY !== null) {
      const offset = dragStartY - e.clientY; //offset이 양수면 위로 드래그, 음수면 아래로 드래그
      setDragOffset(offset);
    }
  };

  const getNextSnap = (): number => {
    const finishY = window.innerHeight - (snap + dragOffset);

    if (dragOffset > 0 && snap < MAX_Y) {
      // 위로 드래그
      if (finishY < MID_Y) return MAX_Y;
      if (finishY > MID_Y) return MID_Y;
    }

    if (dragOffset < 0 && snap > MIN_Y) {
      // 아래로 드래그
      if (finishY > MID_Y) return MIN_Y;
      if (finishY < MID_Y) return MID_Y;
    }

    return snap;
  };

  const handlePointerUp = () => {
    if (dragStartY !== null) {
      const nextSnap: number = getNextSnap();
      setSnap(nextSnap);
    }
    isHeader.current = false;
    setDragStartY(null);
    setDragOffset(0);
  };

  const scrollableClass = snap === MAX_Y ? 'overflow-y-auto' : 'overflow-hidden';
  const isDragging = dragStartY !== null;

  return (
    <div
      ref={sheetRef}
      className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl z-50 ${isDragging ? '' : 'transition-all duration-300'} touch-none select-none pointer-events-auto`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        height: `${MAX_Y}px`,
        transform: `translateY(${MAX_Y - (snap + dragOffset)}px)`,
      }}>
      {/* 드래그 핸들 */}
      <Header onPointerDown={() => isHeader.current = true} />

      <div className={`h-full ${scrollableClass}`}>
        {/* BottomSheet 내용 */}
        {children}
      </div>
    </div>
  );
};
export default BottomSheet;
