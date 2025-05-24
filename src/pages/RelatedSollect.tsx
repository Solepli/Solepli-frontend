import React, { useEffect, useState } from 'react';
import TitleHeader from '../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import SollectPhoto from '../components/Sollect/SollectPhoto';
import { fetchSollects } from '../api/sollectApi';
import { SollectPhotoType } from '../types';
import SollectList from '../components/Sollect/SollectList';


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
    
    <SollectList sollects={sollects} customStyle="pt-58"/>
    </div>
  );
};

export default RelatedSollect;
