import React, { useEffect, useRef, useState } from 'react';
import SollectDetailHeader from '../components/Sollect/SollectDetail/SollectDetailHeader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSollectDetail } from '../api/sollectApi';
import { useSollectDetailStore } from '../store/sollectDetailStore';
import SollectDetailTitle from '../components/Sollect/SollectDetail/SollectDetailTitle';
import SollectDetailProfile from '../components/Sollect/SollectDetail/SollectDetailProfile';
import SollectDetailContent from '../components/Sollect/SollectDetail/SollectDetailContent';
import SollectDetailBottomBar from '../components/Sollect/SollectDetail/SollectDetailBottomBar';
import PreviewContentSummary from '../components/Place/PreviewContentSummary';
import AddCourseButton from '../components/Sollect/SollectDetail/AddCourseButton';
import PlaceSummaryList from '../components/Sollect/SollectDetail/PlaceSummaryList';

const SollectDetailPage = () => {
  const { sollectId } = useParams();

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

  useEffect(() => {
    const observerTarget = observerRef.current;
    if (!observerTarget) {
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
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div id='scrollable' className='overflow-y-scroll h-screen'>
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

        {/* Bottom Bar */}
        <SollectDetailBottomBar />

        {/* places */}
        <div>
          <div className='flex justify-between pt-32 px-16 pb-8 items-center border-b border-primary-100 border-t-10'>
            <p className='text-sm font-bold'>장소가 더 궁금하다면?</p>
            <AddCourseButton />
          </div>

          <PlaceSummaryList />
        </div>

        <div
          className='py-12 text-center text-xs text-primary-500'
          onClick={() => {
            const container = document.getElementById('scrollable');
            container?.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
          맨 위로 올라가기
        </div>
      </div>
    </div>
  );
};

export default SollectDetailPage;
