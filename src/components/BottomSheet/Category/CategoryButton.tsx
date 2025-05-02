import React from 'react';
import { Category } from '../../../types';
import foodFill from '../../../assets/category-icons/foodFill.svg';
import cafeFill from '../../../assets/category-icons/cafeFill.svg';
import drinkFill from '../../../assets/category-icons/drinkFill.svg';
import entertainmentFill from '../../../assets/category-icons/entertainmentFill.svg';
import cultureFill from '../../../assets/category-icons/cultureFill.svg';
import shopFill from '../../../assets/category-icons/shopFill.svg';
import walkFill from '../../../assets/category-icons/walkFill.svg';
import workFill from '../../../assets/category-icons/workFill.svg';

interface CategoryButtonProps {
  category: Category;
}

const Background: React.FC<CategoryButtonProps> = ({ category }) => {
  return (
    <div
      className='w-84 h-84 opacity-10 absolute top-0 left-0 rounded-[10px]'
      style={{ backgroundColor: `var(--color-chip-${category.id})` }}></div>
  );
};

const iconMap: Record<string, string> = {
  food:foodFill,
  cafe:cafeFill,
  drink:drinkFill,
  entertainment:entertainmentFill,
  culture:cultureFill,
  shop:shopFill,
  walk:walkFill,
  work:workFill,
};

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  const icon = iconMap[category.id];
  return (
    <div className='relative w-84 h-84 flex justify-center items-center'>
      <Background category={category} />
      <div className='absolute top-6 right-6 w-6 h-6 rounded-full'style={{ backgroundColor: `var(--color-chip-${category.id})` }} ></div>
      <div>
        <img className='w-32 h-32' src={icon} alt={category.id}/>
        <div className='text-center text-xs font-medium' style={{ color: `var(--color-chip-${category.id})` }}>{category.title}</div>
      </div>
    </div>
  );
};

export default CategoryButton;
