import React, { useEffect } from 'react';
import SolmarkChip from './SolmarkChip';
import { DetailPlace, Hours, PreviewPlace } from '../../types';
import location from '../../assets/location.svg';
import clock from '../../assets/clock.svg';
import share from '../../assets/share.svg';
import XButton from '../XButton';
import { useLocation, useNavigate } from 'react-router-dom';
import arrow from '../../assets/arrow.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Success from '../global/Success';

interface ContentTitleProps {
  previewPlace?: PreviewPlace;
  detailPlace?: DetailPlace;
  property: 'preview' | 'detail';
}

const days = ['월', '화', '수', '목', '금', '토', '일'];

const ContentTitle: React.FC<ContentTitleProps> = ({
  previewPlace,
  detailPlace,
  property,
}) => {
  const isPreview = property === 'preview';
  const isDetail = property === 'detail';
  const place = isPreview ? previewPlace : detailPlace;

  const [showHoursInfo, setShowHoursInfo] = useState(false);

  const navigate = useNavigate();
  const from = useLocation().state?.from;
  const today = new Date().getDay();

  const handleBack = () => {
    // 뒤로가기 버튼
    // search에서 넘어오는 경우 state로 from:search 넘겨줘야 함 (나중에 구현하기)
    if (from == 'preview') {
      navigate('/map/list');
    } else if (from == 'search') {
      navigate('/map');
    } else {
      navigate(-1);
    }
  };

  const buttonStyle = 'w-32 h-32 rounded-lg flex justify-center items-center';

  const [degree, setDegree] = useState(90);

  const handleShowHoursInfo = () => {
    setShowHoursInfo(!showHoursInfo);
    setDegree((prev) => (prev === 90 ? -90 : 90));
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (e) {
      console.log(e);
    }

    toast(<Success title='링크가 복사되었습니다' />);
  };

  const [hours, setHours] = useState<Hours[]>([]);
  useEffect(() => {
    if (detailPlace) {
      const fullHours: Hours[] = [];
      let index = 0;
      let hourIndex = 0;
      while (hourIndex < detailPlace.openingHours.length) {
        if (detailPlace.openingHours[hourIndex].dayOfWeek == index) {
          fullHours.push(detailPlace.openingHours[hourIndex]);
          index++;
          hourIndex++;
        } else {
          fullHours.push({ dayOfWeek: index, endTime: null, startTime: null });
          index++;
        }
      }

      const shifted = fullHours.slice(1).concat(fullHours[0]);
      console.log(shifted);

      setHours(shifted);
    }
  }, []);

  if (!place) return null;
  if (isPreview && !previewPlace) return null;
  if (isDetail && !detailPlace) return null;

  return (
    <div>
      <div className='flex justify-between pb-8 px-16'>
        {/* left */}
        <div className='inline-flex items-center'>
          <span className='text-lg leading-relaxed text-primary-900 font-bold pr-4'>
            {place.name}
          </span>
          <span className='text-sm text-primary-400 pr-12'>
            {place.detailedCategory}
          </span>
          {isPreview && (
            <span className='text-sm text-primary-900 font-semibold'>
              {place.isOpen ? '영업 중' : '영업 종료'}
            </span>
          )}
        </div>

        {/* right */}
        {/* preview */}
        {isPreview && previewPlace && (
          <SolmarkChip
            placeId={previewPlace.id}
            isMarked={previewPlace.isMarked}
          />
        )}

        {/* detail */}
        {isDetail && detailPlace && (
          <div className='flex gap-8'>
            <SolmarkChip
              label
              markCount={detailPlace.markedCount}
              placeId={detailPlace.id}
            />
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
      {isDetail && detailPlace && (
        <div className='text-primary-900 text-sm border-b mb-12 border-primary-100 p-12 pt-0'>
          <div className='flex items-center'>
            <img src={location} alt='location' />
            <p>{detailPlace.address}</p>
          </div>

          <div className='flex items-center' onClick={handleShowHoursInfo}>
            <img src={clock} alt='clock' />
            <p>
              {place.isOpen ? '영업 중' : '영업 종료'}
              {place.isOpen && <span> · {place.closingTime} 영업 종료</span>}
            </p>
            <img
              src={arrow}
              alt='arrow'
              className='w-20 h-20'
              style={{ transform: `rotate(${degree}deg)` }}
            />
          </div>

          {showHoursInfo && (
            <div className='px-24 py-6'>
              <ul>
                {hours &&
                  hours.map((hour, i) => {
                    return (
                      <p
                        className={`text-primary-950 text-sm ${today === hour.dayOfWeek && 'font-bold'}`}
                        key={i}>
                        {days[i]}
                        {hour.startTime && hour.endTime ? (
                          <span>
                            {' '}
                            · {hour.startTime} ~ {hour.endTime}
                          </span>
                        ) : (
                          <span> · 정기휴무</span>
                        )}
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
