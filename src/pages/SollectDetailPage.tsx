import { useEffect, useRef, useState } from 'react';
import SollectDetailHeader from '../components/Sollect/SollectDetail/SollectDetailHeader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSollectDetail } from '../api/sollectApi';
import { useSollectDetailStore } from '../store/sollectDetailStore';
import SollectDetailTitle from '../components/Sollect/SollectDetail/SollectDetailTitle';
import SollectDetailProfile from '../components/Sollect/SollectDetail/SollectDetailProfile';
import SollectDetailContent from '../components/Sollect/SollectDetail/SollectDetailContent';
import SollectDetailBottomBar from '../components/Sollect/SollectDetail/SollectDetailBottomBar';
import AddCourseButton from '../components/Sollect/SollectDetail/AddCourseButton';
import PlaceSummaryList from '../components/Sollect/SollectDetail/PlaceSummaryList';
import { placeSummary } from '../types';
import Loading from '../components/global/Loading';
import Lightbox from 'yet-another-react-lightbox';

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
      const sum = sollect.data.placeSummaries.map((place: RawPlace) => {
        return {
          ...place,
          // id: place.placeId,
        };
      });
      const updatedData = {
        ...sollect.data,
        placeSummaries: sum,
      };
      console.log(updatedData);
      setSollectDetail(updatedData);
    }
  }, [sollect.data, setSollectDetail]);

  const observerRef = useRef<HTMLDivElement>(null);
  const [isTop, setIsTop] = useState(true);

  const images = [
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjrjCZ_JYtxtHi4qn7kyIJs9Qr20PBUyBwgQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjrjCZ_JYtxtHi4qn7kyIJs9Qr20PBUyBwgQ&s",
  ]

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

      <Lightbox
      open={true}
      // close={() => setOpen(false)}
      slides={images.map((src) => ({ src }))}
      animation={{
        swipe: 400, // 스와이프 애니메이션 지속 시간 (밀리초 단위)
      }}
      
    />
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
          className='py-8 px-16 text-center text-xs pb-56 text-primary-500 button'
          onClick={() => {
            const container = document.getElementById('scrollable');
            container?.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
          <p className='h-40 flex justify-center items-center'>
            맨 위로 올라가기
          </p>
        </div>
      </div>
      <Loading active={sollect.isLoading} text='쏠렉트 불러오는 중' />
    </div>
  );
};

export default SollectDetailPage;

type RawPlace = placeSummary & {
  placeId?: number;
};
