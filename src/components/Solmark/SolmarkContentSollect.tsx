import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchSolmarkSollect } from '../../api/solmarkApi';
import SollectList from '../Sollect/SollectList';
import { SollectPhotoType } from '../../types';
import arrow from '../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';

const SolmarkContentSollect = () => {
  const navigate = useNavigate();
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
        <div className='text-center py-250'>
          <p className='font-bold text-primary-950 mb-5'>
            아직 저장된 쏠렉트가 없어요!
          </p>
          <p
            className='flex justify-center text-sm text-primary-700 underline items-center'
            onClick={() => navigate('/sollect')}>
            쏠렉트 보러 가기
            <img src={arrow} alt='' className='w-24 h-24' />{' '}
          </p>
        </div>
      )}
    </div>
  );
};

export default SolmarkContentSollect;
