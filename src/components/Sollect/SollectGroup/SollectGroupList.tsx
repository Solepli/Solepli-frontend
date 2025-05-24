import React, { useEffect, useState } from 'react';
import SollectGroup from './SollectGroup';
import { fetchSollects } from '../../../api/sollectApi';
import { SollectPhotoType } from '../../../types';

const SollectGroupList = () => {
  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  useEffect(() => {
    const getSollects = async () => {
      const data = await fetchSollects();
      setSollects(data);
    };

    getSollects();
  }, []);

  return (
    <div className='mt-32'>
      <SollectGroup sollects={sollects} title="조용히 집중하고 싶은 당신을 위해" />
      <SollectGroup sollects={sollects} title="조용히 집중하고 싶은 당신을 위해"/>
    </div>
  );
};

export default SollectGroupList;
