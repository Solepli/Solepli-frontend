import React from 'react';
import SolmarkChip from './SolmarkChip';
import { Place } from '../../types';
import location from '../../assets/location.svg';
import clock from '../../assets/clock.svg';
import share from '../../assets/share.svg';
import XButton from '../XButton';
import { useLocation, useNavigate } from 'react-router-dom';

interface ContentTitleProps {
  place: Place;
  property: 'preview' | 'detail';
}

const ContentTitle: React.FC<ContentTitleProps> = ({ place, property }) => {
  const isPreview = property === 'preview';
  const isDetail = property === 'detail';

  const navigate = useNavigate();
  const from = useLocation().state?.from;

  const handleBack = () => {
    // 뒤로가기 버튼
    // search에서 넘어오는 경우 state로 from:search 넘겨줘야 함 (나중에 구현하기)
    if (from == 'preview') {
      navigate('/map/list');
    } else if (from == 'search') {
      navigate('/map');
    }
  };

  const buttonStyle = 'w-32 h-32 rounded-lg flex justify-center items-center';

  return (
    <div>
      <div className='flex justify-between pb-8 px-16'>
        {/* left */}
        <div className='inline-flex items-center'>
          <span className='text-base text-primary-900 font-bold pr-4'>
            {place.title}
          </span>
          <span className='text-xs text-primary-400 pr-10'>
            {place.category.title}
          </span>
          {isPreview && (
            <span className='text-xs text-primary-900 font-semibold'>
              영업 중
            </span>
          )}
        </div>

        {/* right */}
        {/* preview */}
        {isPreview && <SolmarkChip />}

        {/* detail */}
        {isDetail && (
          <div className='flex gap-8'>
            <SolmarkChip label />
            <div className={`${buttonStyle} border border-primary-400`}>
              <img src={share} alt='share' />
            </div>
            <XButton onClickFunc={handleBack} detail />
          </div>
        )}
      </div>

      {/* 위치, 영업시간 */}
      {isDetail && (
        <div className='text-primary-900 text-xs border-b mb-12 border-primary-100 p-12 pt-0'>
          <div className='flex items-center'>
            <img src={location} alt='location' />
            <p>{place.address}</p>
          </div>
          <div className='flex items-center'>
            <img src={clock} alt='clock' />
            <p>영업 중</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentTitle;
