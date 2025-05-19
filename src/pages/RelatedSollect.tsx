import React from 'react'
import TitleHeader from '../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';


const RelatedSollect = () => {
    const navigate = useNavigate();
  return (
    <div>
            <TitleHeader title="관련 쏠렉트" onClick={()=>navigate(-1)}/>


    </div>
  );
}

export default RelatedSollect