import React from 'react';
import CategoryButton from './CategoryButton';
import { Category } from '../../../types';

const CategoryButtonList: React.FC = () => {
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
    <div className='p-16 pt-0'>
      <h1 className='pl-4 py-12 text-black text-lg font-bold'>카테고리</h1>
      <div className='flex flex-wrap justify-between gap-y-8'>
        {categories.map((category) => {
          return <CategoryButton category={category} />;
        })}
      </div>
    </div>
  );
};

export default CategoryButtonList;
