import React from 'react';

interface PreviewPhotosProps {
  images: string[];
}

const PreviewPhotos: React.FC<PreviewPhotosProps> = ({ images }) => {
  return (
    <div className='px-16 pb-16 pt-4 gap-2 grid grid-cols-3'>
      {images.map((image, i) => {
        return (
          <img
            src={image}
            alt=''
            className={`h-90 object-cover rounded-sm ${i === 0 ? 'rounded-tl-[20px]' : ''} ${i === 2 ? 'rounded-br-[20px]' : ''}`}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default PreviewPhotos;
