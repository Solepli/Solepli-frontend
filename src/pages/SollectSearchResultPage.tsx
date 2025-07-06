import { useEffect, useState } from 'react';
import SollectGNB from '../components/Sollect/SollectGNB';
import SollectChipList from '../components/Sollect/SollectChip/SollectChipList';
import SollectList from '../components/Sollect/SollectList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchSollect } from '../api/sollectApi';
import SollectNoResult from '../components/Sollect/SollectNoResult';
import { useSearchStore } from '../store/searchStore';
import { useSollectStore } from '../store/sollectStore';
import { useScrollSentinel } from '../hooks/useInfiniteScrollQuery';

const SollectSearchResultPage = () => {
  const { inputValue } = useSearchStore();
  const { selectedCategory, setSollects, sollects } = useSollectStore();
  const [hasResult, setHasResult] = useState(false);

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

  // sentinelRef div가 뷰포트에 들어오면 다음 페이지 fetch
  // 스크롤 끝까지 했는지 sentinel 감시
  const sentinelRef = useScrollSentinel({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // 프론트에서 카테고리 필터링 하지 않고 백엔드에서 그냥 처리하도록 함
  // 검색 결과 데이터가 처음에 있었으면 (한번이라도 존재했으면) hasResult true
  // 검색 결과 데이터가 처음부터 없었으면 (한 번도 존재 안했으면) hasResult false
  // hasResult로 SollectChipList 띄울지 말지 결정
  useEffect(() => {
    // 데이터 합침
    const flattened = data?.pages.flat() ?? [];
    setSollects(flattened);

    if (flattened.length > 0) {
      setHasResult(true);
    }
  }, [data, setSollects]);

  return (
    <div>
      <div className='z-10 w-full bg-white fixed'>
        <SollectGNB />
        {hasResult && <SollectChipList />}
      </div>

      {sollects.length > 0 ? (
        <div className='pt-133 pb-24'>
          <SollectList />
          <div ref={sentinelRef} style={{ height: '1px' }} />
          {isFetchingNextPage && (
            <div className='text-center py-4'>로딩 중...</div>
          )}
        </div>
      ) : hasResult ? (
        <div className='pt-61'>
          <SollectNoResult />
        </div>
      ) : (
        <SollectNoResult />
      )}
    </div>
  );
};

export default SollectSearchResultPage;
