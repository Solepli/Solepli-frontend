import React from 'react';
import DragAndDrap from '../../../assets/dragAndDrop.svg?react';
import Trash from '../../../assets/trash.svg?react';
import { ReleatedSearchPlace } from '../../../types';
import { iconSmallMap } from '../../../utils/icon';

const SollectWriteAddedPlace: React.FC<{ place: ReleatedSearchPlace }> = ({ place }) => {
    return (
        <div className="group flex items-center justify-center w-full h-60 py-12 pl-2 pr-6 bg-primary-50 rounded-lg border border-primary-100 gap-2
        active:bg-primary-500 active:border-primary-100 active:text-primary-50">
            <DragAndDrap className='w-24 h-24 flex-shrink-0 text-primary-400 group-active:text-primary-50' />
            <div className='flex-1 flex gap-10 items-center h-35'>
                {place.category && iconSmallMap[place.category] && (
                    React.createElement(iconSmallMap[place.category], {className: 'w-32 h-32 flex-shrink-0'})
                )}
                <div className='flex flex-col justify-between h-full'>
                    <span className='text-primary-950 text-sm font-semibold leading-tight group-active:text-primary-50'> {place.name}</span>
                    <span className='text-primary-400 text-xs font-normal leading-none group-active:text-primary-50'>{place.address}</span>
                </div>
            </div>
            <div className='p-6'>
                <Trash className='w-24 h-24 flex-shrink-0 text-primary-400 group-active:text-primary-50' />
            </div>
        </div>
    );
}

export default SollectWriteAddedPlace;