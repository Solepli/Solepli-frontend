import React, { useEffect, useState } from 'react';
import PopularSollectPhoto from './PopularSollectPhoto';
import { SollectPhotoType } from '../../types';
import { fetchSollects } from '../../api/sollectApi';

const PopularSollectList = () => {
  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  useEffect(() => {
    const getSollects = async () => {
      const data = await fetchSollects();
      setSollects(data);
    };

    getSollects();
  }, []);

  return (
    <div className='pt-12 flex overflow-x-scroll'>
      {sollects.map((sollect) => {
        return <PopularSollectPhoto sollect={sollect} />;
      })}
    </div>
  );
};

export default PopularSollectList;
