import React, { useEffect, useState } from 'react';
import heart from '../../assets/heart.svg';
import heartFillWhite from '../../assets/heartFillWhite.svg';
import { fetchPlaceCollections, patchSolmark } from '../../api/solmarkApi';
import LoginRequiredAction from '../../auth/LoginRequiredAction';
import { useQuery } from '@tanstack/react-query';
import { usePlaceStore } from '../../store/placeStore';

interface SolmarkChipProps {
  label?: boolean;
  markCount?: number;
  isMarked?: boolean;
  placeId: number;
}

const SolmarkChip: React.FC<SolmarkChipProps> = ({
  placeId,
  label,
  markCount = 0, // 기본값 설정
  isMarked = false, // 기본값 설정
}) => {
  const { selectedPlace } = usePlaceStore();
  const [isSolmark, setIsSolmark] = useState(() =>
    label ? !!selectedPlace?.isMarked : !!isMarked
  );
  const [count, setCount] = useState(markCount ? markCount : 0);

  const { data } = useQuery({
    queryKey: ['collections'],
    queryFn: () => fetchPlaceCollections(),
  });

  useEffect(() => {
    setCount(markCount);
  }, [markCount]);

  useEffect(() => {
    if (label) {
      setIsSolmark(!!selectedPlace?.isMarked);
    } else {
      setIsSolmark(!!isMarked);
    }
  }, [label, selectedPlace?.isMarked, isMarked]);

  const handleClick = async () => {
    try {
      // todo : 추후 장소 쏠마크시 폴더 선택 기능 생기면 수정 필요
      const array: number[] = [data[0].collectionId];
      const empty: number[] = [];

      if (isSolmark) {
        await patchSolmark(placeId, empty, array);
        setCount(count - 1);
        setIsSolmark((prev) => !prev);
      } else {
        await patchSolmark(placeId, array, empty);
        setCount(count + 1);
        setIsSolmark((prev) => !prev);
      }
    } catch (error) {
      console.error('Failed to update solmark:', error);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <LoginRequiredAction onAction={handleClick}>
        {label ? (
          <div
            className={`flex w-58 h-32 p-2 border rounded-lg justify-center items-center 
        ${isSolmark ? 'border-chip-mark bg-chip-mark' : 'border-chip-bg-mark'}`}>
            <img
              src={isSolmark ? heartFillWhite : heart}
              alt=''
              className='w-24 h-24'
            />
            <p
              className={`w-30 text-center text-xs ${isSolmark ? 'text-white' : 'text-chip-bg-mark'}`}>
              {count}
            </p>
          </div>
        ) : (
          <div
            className={`flex w-24 h-24 border rounded-lg justify-center items-center 
        ${isSolmark ? 'bg-chip-mark border-chip-mark' : 'border-chip-bg-mark'}`}>
            <img
              src={isSolmark ? heartFillWhite : heart}
              alt=''
              className='w-24 h-24'
            />
          </div>
        )}
      </LoginRequiredAction>
    </div>
  );
};

export default SolmarkChip;
