import React from 'react';
import SolmarkChip from './SolmarkChip';
import { Place } from '../../types';
import location from "../../assets/location.svg";
import clock from "../../assets/clock.svg";
import share from "../../assets/share.svg"
import xButton from "../../assets/x-button.svg"

interface ContentTitleProps {
  place: Place;
  property: 'preview' | 'detail';
}

const ContentTitle: React.FC<ContentTitleProps> = ({ place, property }) => {
  const isPreview = property === 'preview';
  const isDetail = property === 'detail';

  const buttonStyle = "w-32 h-32 rounded-lg flex justify-center items-center";

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
            <span className='text-xs text-primary-900 font-semibold'>영업 중</span>
          )}
        </div>

        {/* right */}
        {/* preview */}
        {isPreview && <SolmarkChip/>}

        {/* detail */}
        {isDetail && (
          <div className='flex gap-8'>
            <SolmarkChip label/>
            <div className={`${buttonStyle} border border-primary-400`}><img src={share} alt="share" /></div>
            <div className={`${buttonStyle} bg-primary-100`}><img src={xButton} alt="x-button" /></div>
          </div>
        )}
      </div>

      {/* 위치, 영업시간 */}
      {isDetail && (
        <div className='text-primary-900 text-xs border-b mb-12 border-primary-100 p-12 pt-0'>
          <div className='flex items-center'><img src={location} alt="location" /><p>{place.address}</p></div>
          <div className='flex items-center'><img src={clock} alt="clock" /><p>영업 중</p></div>
        </div>
      )}
    </div>
  );
};

export default ContentTitle;
