import React, { useEffect, useState } from 'react';
import TitleHeader from '../components/global/TitleHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRelatedSollect, fetchSollects } from '../api/sollectApi';
import { SollectPhotoType } from '../types';
import SollectList from '../components/Sollect/SollectList';


const RelatedSollect = () => {
  const navigate = useNavigate();
  const {placeId} = useParams();

  const [sollects, setSollects] = useState<SollectPhotoType[]>([]);

  // TODO: 무한스크롤
  useEffect(()=>{
    const getSollects = async ()=>{
      const data = await fetchRelatedSollect(Number(placeId),1);
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
