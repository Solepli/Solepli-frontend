import React from 'react';
import CategoryButton from './CategoryButton';
import { categories } from '../../../utils/category';

const CategoryButtonList: React.FC = () => {

  return (
    <div className='p-16 pt-0'>
      <h1 className='pl-4 py-12 text-black text-lg font-bold'>카테고리</h1>
      <div className='flex flex-wrap justify-between gap-y-8'>
        {categories.map((category) => {
          return <CategoryButton category={category} key={category.id} />;
        })}
      </div>
    </div>
  );
};

export default CategoryButtonList;
