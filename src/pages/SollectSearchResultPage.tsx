import React from 'react';
import SollectGNB from '../components/Sollect/SollectGNB';
import SollectChipList from '../components/Sollect/SollectChip/SollectChipList';
import SollectList from '../components/Sollect/SollectList';
import { useQuery } from '@tanstack/react-query';
import { fetchSollects } from '../api/sollectApi';

const SollectSearchResultPage = () => {
  const { data } = useQuery({
    queryKey: ['sollects'],
    queryFn: fetchSollects,
  });
  return (
    <div>
      <div className='z-10 w-full bg-white fixed'>
        <SollectGNB />
        <SollectChipList />
      </div>

      <div className='pt-133 pb-24'>
        <SollectList sollects={data ? data : []} />
      </div>
    </div>
  );
};

export default SollectSearchResultPage;
