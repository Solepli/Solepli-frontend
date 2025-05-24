import React, { useEffect, useState } from 'react';
import PopularSollectPhoto from './PopularSollectPhoto';
import { SollectPhotoType } from '../../types';
import { fetchSollects } from '../../api/sollectApi';

const PopularSollectList = () => {
  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const SLIDE_WIDTH = 350;

  useEffect(() => {
    const getSollects = async () => {
      const data = await fetchSollects();
      setSollects(data);
    };

    getSollects();
  }, []);

  return (
    <div
      className={`pb-12 flex overflow-hidden w-${SLIDE_WIDTH}`}
      style={{
        transform: `translateX(${-currentIndex * SLIDE_WIDTH + transX}px)`,
      }}>
      {sollects.map((sollect) => {
        return <PopularSollectPhoto sollect={sollect} />;
      })}
    </div>
  );
};

export default PopularSollectList;
