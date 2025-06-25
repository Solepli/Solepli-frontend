import React, { useEffect } from 'react';
import SollectList from './SollectList';
import { useQuery } from '@tanstack/react-query';
import { fetchRecommendSollect } from '../../api/sollectApi';
import { useSearchStore } from '../../store/searchStore';
import { useSollectStore } from '../../store/sollectStore';

const SollectNoResult = () => {
  const {inputValue} = useSearchStore();
  const {selectedCategory} = useSollectStore();

  const { data } = useQuery({
    queryKey: ['sollects', selectedCategory],
    queryFn: () => fetchRecommendSollect(inputValue, selectedCategory),
  });

  return (
    <div className='pt-58'>
      <div className='py-80 text-center'>
        <p className='text-primary-900 font-bold mb-4'>
          검색 결과를 찾지 못 했어요
        </p>
        <p className='text-primary-900 text-xs'>검색어를 다시 입력해주세요</p>
      </div>

      <div className='px-16 mb-16'>
        <div className='relative py-5'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-primary-100'></div>
          </div>
          <div className='relative flex justify-center'>
            <span className='bg-white px-10 text-sm text-primary-900 font-bold'>
              추천 솔렉트
            </span>
          </div>
        </div>
      </div>

      <div>
        <SollectList sollects={data ? data : []} />
      </div>
    </div>
  );
};

export default SollectNoResult;
