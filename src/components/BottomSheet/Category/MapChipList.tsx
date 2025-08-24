import React from 'react'
import MapChip from './MapChip';
import { categories } from '../../../utils/category';

const MapChipList: React.FC = () => {
  
    return (
      <div className='flex gap-8 p-16 pt-8 h-54 whitespace-nowrap overflow-x-scroll border-b border-primary-100 shrink-0 sticky top-0 bg-white z-1 touch-pan-x'>
        {categories.map((category) => {
          return <MapChip key={category.title} category={category} />;
        })}
      </div>
    );
  };

export default MapChipList