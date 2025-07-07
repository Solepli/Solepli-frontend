import React from 'react';
import DragAndDrap from '../../../assets/dragAndDrop.svg?react';
import Trash from '../../../assets/trash.svg?react';
import { PlaceInfo } from '../../../types';
import { iconSmallMap } from '../../../utils/icon';

const SollectWriteAddedPlace: React.FC<{
  place: PlaceInfo;
  handleRemove: (placeId: number | null) => void;
  isDragging?: boolean;
}> = ({ place, handleRemove, isDragging = false }) => {
  return (
    <div
      className={`group flex items-center justify-center w-full h-60 py-12 pl-2 pr-6 rounded-lg border gap-2
          ${
            isDragging
              ? 'bg-primary-500 border-primary-100 text-primary-50'
              : 'bg-primary-50 border-primary-100'
          }
          `}>
      <DragAndDrap
        className={`w-24 h-24 flex-shrink-0 ${
          isDragging ? 'text-primary-50' : 'text-primary-400'
        }`}
      />
      <div className='flex-1 flex gap-10 items-center h-35'>
        {place.category &&
          iconSmallMap[place.category] &&
          React.createElement(iconSmallMap[place.category], {
            className: `w-32 h-32 flex-shrink-0 ${
              isDragging ? 'text-primary-50' : 'text-current'
            }`,
          })}
        <div className='flex flex-col justify-between h-full'>
          <span
            className={`text-sm font-semibold leading-tight ${
              isDragging ? 'text-primary-50' : 'text-primary-950'
            }`}>
            {place.name}
          </span>
          <span
            className={`text-xs font-normal leading-none ${
              isDragging ? 'text-primary-50' : 'text-primary-400'
            }`}>
            {place.address}
          </span>
        </div>
      </div>
      <div className='p-6' onClick={() => handleRemove(place.id)}>
        <Trash
          className={`w-24 h-24 flex-shrink-0 ${
            isDragging ? 'text-primary-50' : 'text-primary-400'
          }`}
        />
      </div>
    </div>
  );
};

export default SollectWriteAddedPlace;
