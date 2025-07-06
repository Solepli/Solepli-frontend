import { useEffect, useState } from 'react';
import SolmarkPlaceListCard from './SolmarkPlaceListCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaceCollections } from '../../api/solmarkApi';
import { SolmarkPlaceList } from '../../types';

const SolmarkContentPlace = ({isSolroute = false}) => {
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
    <div
      className={`${isSolroute ? 'py-16' : 'py-24'} px-16 flex flex-col gap-12`}>
      {listData &&
        listData.map((list, i) => {
          return <SolmarkPlaceListCard list={list} key={i} isSolroute={isSolroute} />;
        })}
    </div>
  );
};

export default SolmarkContentPlace;
