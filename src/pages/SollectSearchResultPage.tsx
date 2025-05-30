import React, { useEffect, useState } from 'react';
import SollectGNB from '../components/Sollect/SollectGNB';
import SollectChipList from '../components/Sollect/SollectChip/SollectChipList';
import SollectList from '../components/Sollect/SollectList';
import { useQuery } from '@tanstack/react-query';
import { fetchSollects, searchSollect } from '../api/sollectApi';
import SollectNoResult from '../components/Sollect/SollectNoResult';
import { useSearchStore } from '../store/searchStore';
import { useSollectStore } from '../store/sollectStore';

const SollectSearchResultPage = () => {
  const { inputValue } = useSearchStore();
  const {selectedCategory, clearCategory} = useSollectStore();
  const [cursorId, setCursorId] = useState();

  const { data } = useQuery({
    queryKey: ['searchSollect', inputValue, selectedCategory, cursorId],
    queryFn: () => searchSollect(inputValue, selectedCategory, undefined, cursorId),
  });

  return (
    <div>
      <div className='z-10 w-full bg-white fixed'>
        <SollectGNB />
        {data && data.length !== 0 && <SollectChipList />}
      </div>

      {data && data.length !== 0 ? (
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
