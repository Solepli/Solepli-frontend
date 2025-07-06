import React from 'react';
import SolmarkContentPlace from '../components/Solmark/SolmarkContentPlace';
import LargeButtonInverted from '../components/global/LargeButtonInverted';
import { useNavigate } from 'react-router-dom';

const SolroutePlaceAddPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* 쏠마크 content list */}
      <SolmarkContentPlace isSolroute={true} />

      {/* 장소 검색 버튼*/}
      <div className='pt-24 px-16 pb-48'>
        <LargeButtonInverted
          text='장소 추가'
          onClick={() => {
            navigate('/solroute/write/search');
          }}
        />
      </div>
    </div>
  );
};

export default SolroutePlaceAddPage;
