import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchSolmarkSollect } from '../../api/solmarkApi';
import SollectList from '../Sollect/SollectList';
import { SollectPhotoType } from '../../types';
import arrow from '../../assets/arrow.svg';

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
      {sollects.length !== 1 ? (
        <SollectList sollects={data} />
      ) : (
        <div className='flex justify-center items-center h-full text-center'>
          <div className='pt-240'>
            <p className='font-bold text-primary-950'>
              아직 저장된 쏠렉트가 없어요!
            </p>
            <p className='flex text-center justify-center'>
              쏠렉트 보러 가기
              <img src={arrow} alt='' className='w-24 h-24' />{' '}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolmarkContentSollect;
