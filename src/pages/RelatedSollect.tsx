import React, { useEffect, useState } from 'react';
import TitleHeader from '../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import SollectPhoto from '../components/Sollect/SollectPhoto';
import { fetchSollects } from '../api/sollectApi';
import { SollectPhotoType } from '../types';


const RelatedSollect = () => {
  const navigate = useNavigate();

  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  useEffect(()=>{
    const getSollects = async ()=>{
      const data = await fetchSollects();
      setSollects(data);
    };

    getSollects();
  },[])
  
  return (
    <div>
      <TitleHeader title='관련 쏠렉트' onClick={() => navigate(-1)} />
    
      <div className='flex flex-wrap gap-12 justify-center pt-58'>
        {sollects.map((sollect) => {
          return <SollectPhoto sollect={sollect} key={sollect.id} />;
        })}
      </div>
    </div>
  );
};

export default RelatedSollect;
