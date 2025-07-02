import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { SollectPhotoType } from '../../types';
import { fetchMySolmarkSollect } from '../../api/solmarkApi';
import SollectList from '../Sollect/SollectList';
import SolmarkNoResult from './SolmarkNoResult';

const SolmarkContentMy = () => {
  const { data } = useQuery({
    queryKey: ['solmarkSollects'],
    queryFn: () => fetchMySolmarkSollect(),
  });

  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  useEffect(() => {
    if (data) {
      setSollects(data);
    }
  }, [data]);

  return (
    <div className='py-16'>
      {sollects.length != 0 ? (
        <SollectList sollects={sollects} isMine />
      ) : (
        <SolmarkNoResult type='my' />
      )}
    </div>
  );
};

export default SolmarkContentMy;
