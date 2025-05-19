import React from 'react';
import SolmarkChip from './SolmarkChip';
import { Place } from '../../types';
import location from '../../assets/location.svg';
import clock from '../../assets/clock.svg';
import share from '../../assets/share.svg';
import XButton from '../XButton';
import { useLocation, useNavigate } from 'react-router-dom';
import arrow from '../../assets/arrow.svg';
import { useState } from 'react';

interface ContentTitleProps {
  place: Place;
  property: 'preview' | 'detail';
}

const days = ['월', '화', '수', '목', '금', '토', '일'];

const ContentTitle: React.FC<ContentTitleProps> = ({ place, property }) => {
  const isPreview = property === 'preview';
  const isDetail = property === 'detail';

  const [showHoursInfo, setShowHoursInfo] = useState(false);

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

  // 하드코딩
  const isOpen = true;
  const closingTime = '22:30';
  const [degree, setDegree] = useState(90);

  const handleShowHoursInfo = () => {
    setShowHoursInfo(!showHoursInfo);
    setDegree((degree + 180) % 360);
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className='flex justify-between pb-8 px-16'>
        {/* left */}
        <div className='inline-flex items-center'>
          <span className='text-lg text-primary-900 font-bold pr-4'>
            {place.title}
          </span>
          <span className='text-sm text-primary-400 pr-12'>
            {place.category.title}
          </span>
          {isPreview && (
            <span className='text-sm text-primary-900 font-semibold'>
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
            <div
              className={`${buttonStyle} border border-primary-400`}
              onClick={copyUrl}>
              <img src={share} alt='share' />
            </div>
            <XButton onClickFunc={handleBack} detail />
          </div>
        )}
      </div>

      {/* detail 위치, 영업시간 */}
      {isDetail && (
        <div className='text-primary-900 text-sm border-b mb-12 border-primary-100 p-12 pt-0'>
          <div className='flex items-center'>
            <img src={location} alt='location' />
            <p>{place.address}</p>
          </div>

          <div className='flex items-center' onClick={handleShowHoursInfo}>
            <img src={clock} alt='clock' />
            <p>
              {isOpen ? '영업 중' : '영업 종료'} · {closingTime} 영업 종료
            </p>
            <img
              src={arrow}
              alt='arrow'
              className={`w-20 h-20 rotate-${degree}`}
            />
          </div>

          {showHoursInfo && (
            <div className='px-24 py-6'>
              <ul>
                {place.hours.map((hour) => {
                  return (
                    <p className='text-primary-950 text-sm'>
                      {days[hour.day]}{' '}
                      <span className='text-primary-400'>·</span>{' '}
                      {hour.startTime} ~ {hour.endTime}
                    </p>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentTitle;
