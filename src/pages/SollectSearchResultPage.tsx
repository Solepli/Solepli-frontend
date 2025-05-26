import React from 'react';
import SollectGNB from '../components/Sollect/SollectGNB';
import SollectChipList from '../components/Sollect/SollectChip/SollectChipList';
import SollectList from '../components/Sollect/SollectList';
import { useQuery } from '@tanstack/react-query';
import { fetchSollects } from '../api/sollectApi';
import SollectNoResult from '../components/Sollect/SollectNoResult';

const SollectSearchResultPage = () => {
  const { data } = useQuery({
    queryKey: ['sollects'],
    queryFn: fetchSollects,
  });

  // category filtering Data 구현 필요

  return (
    <div>
      <div className='z-10 w-full bg-white fixed'>
        <SollectGNB />
        {data && <SollectChipList />}
      </div>

      {data ? (
        <div className='pt-133 pb-24'>
          <SollectList sollects={data ? data : []} />
        </div>
      ) : (
        <SollectNoResult />
      )}
    </div>
  );
};

export default SollectSearchResultPage;
