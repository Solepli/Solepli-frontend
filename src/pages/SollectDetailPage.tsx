import React, { useEffect, useRef, useState } from 'react';
import SollectDetailHeader from '../components/Sollect/SollectDetail/SollectDetailHeader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSollectDetail } from '../api/sollectApi';
import { useSollectDetailStore } from '../store/sollectDetailStore';
import SollectDetailTitle from '../components/Sollect/SollectDetail/SollectDetailTitle';
import SollectDetailProfile from '../components/Sollect/SollectDetail/SollectDetailProfile';
import SollectDetailContent from '../components/Sollect/SollectDetail/SollectDetailContent';

const SollectDetailPage = () => {
  const {sollectId} = useParams();

  const { setSollectDetail } = useSollectDetailStore();

  const sollect = useQuery({
    queryKey: ['sollectDetail', sollectId],
    queryFn: () => fetchSollectDetail(Number(sollectId)),
    enabled: !!sollectId,
  });

  useEffect(() => {
    if (sollect.data) {
      setSollectDetail(sollect.data);
    }
  }, [sollect.data, setSollectDetail]);

  const observerRef = useRef<HTMLDivElement>(null);
  const [isTop, setIsTop] = useState(true);

  useEffect(()=>{
    const observerTarget = observerRef.current;
    if(!observerTarget){
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTop(entry.isIntersecting); // 화면 안에 있으면 isTop = true
      },
      {
        threshold: 0, // 살짝이라도 벗어나면 false
      }
    );

    observer.observe(observerTarget);
    return()=>{
      observer.disconnect();
    }
  },[]);
  return (
    <div>
      {/* SollectDetailHeader */}
      <SollectDetailHeader isTop={isTop} />

      {/* Title */}
      <div ref={observerRef}>
        <SollectDetailTitle />
      </div>

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
