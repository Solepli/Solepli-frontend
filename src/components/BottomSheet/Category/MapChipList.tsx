import React from 'react'
import { Category } from '../../../types';
import MapChip from './MapChip';

const MapChipList: React.FC = () => {
    const categories: Category[] = [
      { title: '식당', id: 'food' },
      { title: '카페', id: 'cafe' },
      { title: '주점', id: 'drink' },
      { title: '쇼핑', id: 'shop' },
      { title: '공부/작업', id: 'work' },
      { title: '산책', id: 'walk' },
      { title: '문화/예술', id: 'culture' },
      { title: '오락/여가', id: 'entertainment' },
    ];
    return (
      <div className='flex gap-10 p-16 pb-14 pt-10 h-52 whitespace-nowrap overflow-x-scroll overflow-y-hidden border-b border-primary-100 shrink-0 sticky top-0 bg-white z-1 touch-pan-x'>
        {categories.map((category) => {
          return <MapChip key={category.title} category={category} />;
        })}
      </div>
    );
  };

export default MapChipList