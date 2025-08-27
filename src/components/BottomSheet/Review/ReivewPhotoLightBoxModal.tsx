import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Counter, Captions } from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import arrow from '../../../assets/arrowWhite.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const ReivewPhotoLightBoxModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const { images } = location.state as { images: string[] };
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div>
      <Lightbox
        open={true}
        close={() => navigate(-1)}
        index={index}
        // 라이트박스가 열릴 때 보여줄 이미지 배열
        slides={images.map((src) => ({ src }))}
        // 인덱스 변경 시 현재 index 업데이트
        on={{ view: ({ index }) => setIndex(index) }}
        // 좌우 버튼
        plugins={[Counter, Captions]}
        counter={{
          container: {
            style: {
              left: '50%',
              transform: 'translateX(-60%)',
              fontSize: '14px',
              color: 'white',
            },
          },
        }}
        render={{
          buttonPrev: () => (
            <button
              onClick={prevSlide}
              className='absolute left-16 top-1/2 -translate-y-1/2 bg-black/60 p-8 z-50'>
              <img src={arrow} alt='next' className='w-24 h-24' />
            </button>
          ),
          buttonNext: () => (
            <button
              onClick={nextSlide}
              className='absolute right-16 top-1/2 -translate-y-1/2 bg-black/60 p-8 z-50'>
              <img src={arrow} alt='next' className='w-24 h-24 rotate-180' />
            </button>
          ),
        }}
      />
    </div>
  );
};

export default ReivewPhotoLightBoxModal;
