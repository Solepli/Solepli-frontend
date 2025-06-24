import React, { useCallback, useEffect, useRef, useState } from 'react';
import SollectGNB from '../components/Sollect/SollectGNB';
import SollectChipList from '../components/Sollect/SollectChip/SollectChipList';
import SollectList from '../components/Sollect/SollectList';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchSollects, searchSollect } from '../api/sollectApi';
import SollectNoResult from '../components/Sollect/SollectNoResult';
import { useSearchStore } from '../store/searchStore';
import { useSollectStore } from '../store/sollectStore';
import { useScrollSentinel } from '../hooks/useInfiniteScrollQuery';

const SollectSearchResultPage = () => {
  const { inputValue } = useSearchStore();
  const { selectedCategory, clearCategory } = useSollectStore();

  // useInfiniteQuery를 통한 무한 스크롤 구현
  // pageParam이 cursorId 역할을 한다. 초기값은 undefined
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['searchSollect', inputValue, selectedCategory], // inputValue, selectedCategory 바뀌면 새로 fetch
      queryFn: ({ pageParam = undefined }) =>
        searchSollect(inputValue, selectedCategory, undefined, pageParam),
      getNextPageParam: (lastPage) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        // 마지막 쏠렉트의 id를 nextPage(cursorId)로 설정
        return lastPage[lastPage.length - 1].sollectId;
      },
      initialPageParam: undefined,
    });

  // 데이터 합침
  const sollects = data ? data.pages.flat() : [];

  // sentinelRef div가 뷰포트에 들어오면 다음 페이지 fetch
  // 스크롤 끝까지 했는지 sentinel 감시
  const sentinelRef = useScrollSentinel({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });


  return (
    <div>
      <div className='z-10 w-full bg-white fixed'>
        <SollectGNB />
        {sollects && sollects.length !== 0 && <SollectChipList />}
      </div>

      {sollects && sollects.length !== 0 ? (
        <div className='pt-133 pb-24'>
          <SollectList sollects={sollects ? sollects : []} />
          <div ref={sentinelRef} style={{ height: '1px' }} />
          {isFetchingNextPage && (
            <div className='text-center py-4'>로딩 중...</div>
          )}
        </div>
      ) : (
        <SollectNoResult />
      )}
    </div>
  );
};

export default SollectSearchResultPage;
