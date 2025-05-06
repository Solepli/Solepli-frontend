// src/components/BottomSheet/BottomSheet.tsx
import React, { useEffect, useRef } from 'react';
import { usePlaceStore } from '../../store/placeStore';
import { places } from '../../places';
import { MAX_Y, MIN_Y, MID_Y, } from '../../constants';
import { useBottomSheetStore } from '../../store/useBottomSheetStore';

const Header: React.FC = () => {
  return (
    <div className='w-full h-20 py-8 inline-flex flex-col justify-center items-center'>
      <div className='w-30 h-4 bg-gray-200 rounded-[10px]' />
    </div>
  );
};

const snapPoints = [MIN_Y, MID_Y, MAX_Y]; // 스냅 포인트 설정

const BottomSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setPlaces = usePlaceStore((state)=>state.setPlaces);
    const sheetRef = useRef<HTMLDivElement>(null);
  const { snap, setSnap } = useBottomSheetStore();
  const [dragStartY, setDragStartY] = React.useState<number | null>(null);
  const [dragOffset, setDragOffset] = React.useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartY(e.clientY);
    sheetRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartY !== null) {
      const offset = dragStartY - e.clientY; //offset이 양수면 위로 드래그, 음수면 아래로 드래그
      setDragOffset(offset);
    }
  };

  const handlePointerUp = () => {
    if (dragStartY !== null) {
      let nextSnap: number = snap;
      if (dragOffset > 0 && snap < MAX_Y) {
        nextSnap = snapPoints.find((point) => point > snap) || MAX_Y;
      } else if (dragOffset < 0 && snap > MIN_Y) {
        if (snap > MID_Y) {
          nextSnap = MID_Y;
        } else {
          nextSnap = MIN_Y;
        }
      }
      setSnap(nextSnap);
    }
    setDragStartY(null);
    setDragOffset(0);
  };
  useEffect(()=>{
    console.log(places);
    setPlaces(places);
  });

  return (
    <div
      ref={sheetRef}
      className='fixed bottom-0 left-0 w-full bg-white rounded-t-2xl z-50 transition-all duration-300 touch-none select-none'
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        height: `${snap}px`,
      }}>
      {/* 드래그 핸들 */}
      <Header />

      <div className='h-full overflow-y-auto'>
        {/* BottomSheet 내용 */}
        {children}
      </div>
    </div>
  );
};
export default BottomSheet;
