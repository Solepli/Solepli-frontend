import { useEffect, useState } from 'react';
import SolmarkPlaceListCard from './SolmarkPlaceListCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaceCollections } from '../../api/solmarkApi';
import { SolmarkPlaceList } from '../../types';

const SolmarkContentPlace = () => {
  const { data } = useQuery({
    queryKey: ['solmarkPlaceList'],
    queryFn: () => fetchPlaceCollections(),
  });
  const [listData, setListData] = useState<SolmarkPlaceList[]>([]);

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  return (
    <div className='py-24 px-16 flex flex-col gap-12'>
      {listData &&
        listData.map((list, i) => {
          return <SolmarkPlaceListCard list={list} key={i} />;
        })}
    </div>
  );
};

export default SolmarkContentPlace;
