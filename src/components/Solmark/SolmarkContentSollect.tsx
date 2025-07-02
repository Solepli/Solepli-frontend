import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchSolmarkSollect } from '../../api/solmarkApi';
import SollectList from '../Sollect/SollectList';
import { SollectPhotoType } from '../../types';
import { useNavigate } from 'react-router-dom';
import SolmarkNoResult from './SolmarkNoResult';

const SolmarkContentSollect = () => {
  const { data } = useQuery({
    queryKey: ['solmarkSollects'],
    queryFn: () => fetchSolmarkSollect(),
  });

  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  useEffect(() => {
    if (data) {
      setSollects(data);
    }
  }, [data]);

  return (
    <div className='py-16'>
      {sollects.length !== 0 ? (
        <SollectList
          sollects={sollects.map((sollect) => {
            sollect.isMarked = true;
            return sollect;
          })}
        />
      ) : (
        <SolmarkNoResult type='sollect' />
      )}
    </div>
  );
};

export default SolmarkContentSollect;
