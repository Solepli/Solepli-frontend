import React, { useEffect } from 'react';
import SollectDetailHeader from '../components/Sollect/SollectDetail/SollectDetailHeader';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { fetchSollectDetail } from '../api/sollectApi';
import { useSollectDetailStore } from '../store/sollectDetailStore';
import SollectDetailTitle from '../components/Sollect/SollectDetail/SollectDetailTitle';
import SollectDetailProfile from '../components/Sollect/SollectDetail/SollectDetailProfile';
import SollectDetailContent from '../components/Sollect/SollectDetail/SollectDetailContent';

const SollectDetailPage = () => {
  const sollectId = 4;
  const { setSollectDetail } = useSollectDetailStore();

  const sollect = useQuery({
    queryKey: ['sollectDetail', sollectId],
    queryFn: () => fetchSollectDetail(sollectId),
    enabled: !!sollectId,
  });

  useEffect(() => {
    if (sollect.data) {
      setSollectDetail(sollect.data);
    }
  }, [sollect.data, setSollectDetail]);
  return (
    <div>
      {/* SollectDetailHeader */}
      <SollectDetailHeader />

      {/* Title */}
      <SollectDetailTitle />

      <div className='flex flex-col'>
        {/* Profile */}
        <SollectDetailProfile />

        {/* content */}
        <SollectDetailContent />
      </div>
      {/* Bottom Bar */}
    </div>
  );
};

export default SollectDetailPage;
