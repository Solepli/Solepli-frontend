import React, { useEffect, useState } from 'react';
import heart from '../../assets/heart.svg';
import heartFillWhite from '../../assets/heartFillWhite.svg';
import { fetchPlaceCollections, patchSolmark } from '../../api/solmarkApi';
import LoginRequiredAction from '../../auth/LoginRequiredAction';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usePlaceStore } from '../../store/placeStore';
import { queryClient } from '../../main';
import { useShallow } from 'zustand/shallow';
import { useSearchStore } from '../../store/searchStore';

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
  const { selectedPlace, selectedCategory } = usePlaceStore(
    useShallow((state) => ({
      selectedPlace: state.selectedPlace,
      selectedCategory: state.selectedCategory,
    }))
  );
  const { selectedRegion, relatedPlaceIdList } = useSearchStore(
    useShallow((state) => ({
      selectedRegion: state.selectedRegion,
      relatedPlaceIdList: state.relatedPlaceIdList,
    }))
  );

  const [isSolmark, setIsSolmark] = useState(() =>
    label ? !!selectedPlace?.isMarked : !!isMarked
  );
  const [count, setCount] = useState(markCount ? markCount : 0);

  const { data } = useQuery({
    queryKey: ['collections'],
    queryFn: () => fetchPlaceCollections(),
  });

  const mutation = useMutation({
    mutationFn: ({
      placeId,
      add,
      remove,
    }: {
      placeId: number;
      add: number[];
      remove: number[];
    }) => patchSolmark(placeId, add, remove),
    onSuccess: () => {
      // 지도 마커 업데이트를 위해 모든 관련 쿼리 무효화
      // MapSheet.tsx에서 사용하는 쿼리들을 모두 무효화하여 마커 아이콘이 업데이트되도록 함
      queryClient.invalidateQueries({
        queryKey: ['queryCategory', selectedCategory],
      });
      queryClient.invalidateQueries({
        queryKey: ['queryRegion', selectedRegion],
      });
      queryClient.invalidateQueries({
        queryKey: ['queryIdList', relatedPlaceIdList],
      });
      // 특정 장소의 상세 정보 쿼리도 무효화 (마커 아이콘 업데이트 필요)
      queryClient.invalidateQueries({ queryKey: ['detailSearching', placeId] });
      
      // 마커 데이터 전체 무효화 - 모든 마커의 isMarked 상태를 최신으로 업데이트
      queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0];
          return key === 'queryCategory' || key === 'queryRegion' || key === 'queryIdList' || key === 'detailSearching';
        },
      });
    },
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
      // const array: number[] = [data[0].collectionId];
      // const empty: number[] = [];

      if (isSolmark) {
        // 쏠마크 삭제
        await mutation.mutateAsync({
          placeId: placeId,
          add: [],
          remove: [data[0].collectionId],
        }); // 장소id, 추가, 삭제

        setCount(count - 1);
        setIsSolmark((prev) => !prev);
      } else {
        // 쏠마크 추가
        await mutation.mutateAsync({
          placeId: placeId,
          add: [data[0].collectionId],
          remove: [],
        });
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
