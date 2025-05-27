import React, { useEffect, useState } from 'react';
import { SollectPhotoType } from '../../types';
import { fetchSollects } from '../../api/sollectApi';
import PopularSollectPhoto from './PopularSollectPhoto';

const SLIDE_WIDTH = 328;

const PopularSollectSlider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [transX, setTransX] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  const handlePointerDown = (e: React.MouseEvent) => {
    console.log(e.clientX);
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setTransX(delta);
  };

  const handlePointerUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    let newIndex = currentIndex;

    if (transX < 0) {
      newIndex = (currentIndex + 1) % sollects.length;
    } else if (transX > 0) {
      newIndex = (currentIndex - 1) % sollects.length;
    }

    setCurrentIndex(newIndex);
    setTransX(0);
  };

  useEffect(() => {
    const getSollects = async () => {
      const data = await fetchSollects();
      setSollects(data);
    };

    getSollects();
  }, []);
  return (
    <div
      className='pb-12 select-none cursor-grab overflow-hidden w-full h-442 pl-20'
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}>
      <div
        className='flex gap-8 transition-transform duration-300 ease-out items-center'
        style={{
          transform: `translateX(${-currentIndex * SLIDE_WIDTH + transX}px)`,
        }}>
        {sollects.map((sollect, i) => {
          return <PopularSollectPhoto sollect={sollect} key={sollect.id} center={i===currentIndex}/>;
        })}
      </div>
    </div>
  );
};

export default PopularSollectSlider;
