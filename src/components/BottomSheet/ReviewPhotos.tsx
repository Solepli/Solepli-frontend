import React from 'react';

interface ReviewPhotosProps {
  images: string[];
}

const ReviewPhotos: React.FC<ReviewPhotosProps> = ({ images }) => {

  return (
    <div className='px-16 pb-20 gap-2 flex overflow-x-scroll'>
      {images.map((image, i) => {
        return (
          <img
            src={image}
            alt=''
            className={`w-100 h-125 object-cover rounded-sm ${i === 0 ? 'rounded-tl-[20px]' : ''} ${i === images.length-1 ? 'rounded-br-[20px]' : ''}`}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default ReviewPhotos;
