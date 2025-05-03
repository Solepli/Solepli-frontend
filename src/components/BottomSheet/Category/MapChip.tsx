import React from 'react';
import { Category } from '../../../types';
import food from '../../../assets/category-icons/food.svg';
import cafe from '../../../assets/category-icons/cafe.svg';
import drink from '../../../assets/category-icons/drink.svg';
import entertainment from '../../../assets/category-icons/entertainment.svg';
import culture from '../../../assets/category-icons/culture.svg';
import shop from '../../../assets/category-icons/shop.svg';
import walk from '../../../assets/category-icons/walk.svg';
import work from '../../../assets/category-icons/work.svg';

interface CategoryButtonProps {
  category: Category;
}

const iconMap: Record<string, string> = {
  food,
  cafe,
  drink,
  entertainment,
  culture,
  shop,
  walk,
  work,
};

const MapChip: React.FC<CategoryButtonProps> = ({ category }) => {
  const icon = iconMap[category.id];
  //   const selectCategory = usePlaceStore((state) => state.selectCategory);
  return (
    <div
      className={`w-fit bg-white py-2 pl-8 pr-12 h-28 rounded-full border flex items-center justify-center shrink-0`}
      style={{ borderColor: `var(--color-chip-${category.id})` }}
      //   onClick={() => selectCategory(category.id)}
    >
      <img src={icon} alt={category.id}/>
      <div className='text-black text-xs font-medium'>{category.title}</div>
    </div>
  );
};

export default MapChip;
