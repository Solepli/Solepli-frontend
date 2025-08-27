import React from 'react';
import arrowTail from '../../assets/arrowTail.svg';
import { useNavigate, useParams } from 'react-router-dom';

interface ReviewPhotosProps {
  images: string[];
  more?: boolean;
}

const ReviewPhotos: React.FC<ReviewPhotosProps> = ({ images, more }) => {
  const navigate = useNavigate();
  const {placeId} = useParams();

  const handleClick = ()=>{
    navigate(`/map/reviews/${placeId}`);
  }

  return (
    <div
      className='px-16 pb-8 gap-2 flex overflow-x-scroll touch-pan-x'
      onClick={() => {
        navigate('/map/reviews/photos', { state: { images } });
      }}>
      {images.map((image, i) => {
        const isLast = i === images.length - 1;

        return (
          <div key={i} className='shrink-0 relative'>
            <img
              src={image}
              alt='review-image'
              className={`h-125 object-cover rounded-sm ${isLast && more ? 'brightness-20' : ''} ${i === 0 ? 'rounded-tl-[20px]' : ''} ${i === images.length - 1 ? 'rounded-br-[20px]' : ''}`}
            />

            {isLast && more && (
              <button
                className='absolute top-40 left-34 text-xs text-white flex flex-col justify-center items-center gap-4'
                onClick={handleClick}>
                <div className='bg-white rounded-full w-24 h-24 flex justify-center items-center'>
                  <img src={arrowTail} alt='arrow' className='w-24 h-24' />
                </div>
                <p>더보기</p>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewPhotos;
