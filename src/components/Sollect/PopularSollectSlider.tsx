import React, { useEffect, useState } from 'react';
import { SollectPhotoType } from '../../types';
import { fetchPopularSollect } from '../../api/sollectApi';
import PopularSollectPhoto from './PopularSollectPhoto';

const SLIDE_WIDTH = 328;

const PopularSollectSlider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [transX, setTransX] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  const handlePointerDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setTransX(delta);
  };

  const handlePointerUp = () => {
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

  const handleTransitionEnd = () => {
    if (currentIndex === sollects.length - 1) {
      setTransition(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(sollects.length - 2);
    }
  };

  useEffect(() => {
    const getSollects = async () => {
      const data = await fetchPopularSollect();
      const addedData = [data[data.length - 1], ...data, data[0]];
      setSollects(addedData);
    };

    getSollects();
  }, []);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  const paddingLeft = (window.innerWidth - 350) / 2;

  return (
    <div
      className={`pb-12 select-none cursor-grab overflow-hidden w-full h-442`}
      style={{paddingLeft:`${paddingLeft}px`}}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}>
      <div
        className={`flex gap-8 items-center ${transition ? 'transition-transform duration-300 ease-out' : ''}`}
        style={{
          transform: `translateX(${-currentIndex * SLIDE_WIDTH + transX}px)`,
        }}
        onTransitionEnd={handleTransitionEnd}>
        {sollects.map((sollect, i) => {
          return (
            <PopularSollectPhoto
              sollect={sollect}
              key={i}
              center={i === currentIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularSollectSlider;
