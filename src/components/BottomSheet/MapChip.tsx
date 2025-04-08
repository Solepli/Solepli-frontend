import React from 'react';
import { Category } from '../../types';
import food from '../../assets/food.svg';
import cafe from '../../assets/cafe.svg';
import drink from '../../assets/drink.svg';
import entertainment from '../../assets/entertainment.svg';
import culture from '../../assets/culture.svg';
import shop from '../../assets/shop.svg';
import walk from '../../assets/walk.svg';
import work from '../../assets/work.svg';

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
      className={`w-fit bg-white py-2 pl-8 pr-12 h-28 rounded-full border flex items-center justify-center`}
      style={{ borderColor: `var(--color-chip-${category.id})` }}
      //   onClick={() => selectCategory(category.id)}
    >
      <img src={icon} alt={category.id}/>
      <div className='text-black text-xs font-medium'>{category.title}</div>
    </div>
  );
};

export default MapChip;
