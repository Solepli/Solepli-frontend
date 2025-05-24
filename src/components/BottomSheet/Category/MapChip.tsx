import React from 'react';
import { Category } from '../../../types';
import { usePlaceStore } from '../../../store/placeStore';
import { iconMap, iconBlackMap } from '../../../utils/icon';

interface CategoryButtonProps {
  category: Category;
}

const MapChip: React.FC<CategoryButtonProps> = ({ category }) => {
  const { selectedCategory, setCategory } = usePlaceStore();
  const isSelected = selectedCategory === category.id;

  const style = {
    backgroundColor: isSelected
      ? `var(--color-chip-bg-${category.id})`
      : 'var(--color-white)',
    color: isSelected ? 'var(--color-black)' : 'var(--color-primary-900)',
    border: isSelected
      ? `1px solid var(--color-chip-${category.id})`
      : '1px solid var(--color-grayScale-100)',
  };

  const IconComponent = isSelected
    ? iconBlackMap[category.id]
    : iconMap[category.id];

  return (
    <>
      <button
        className='w-fit bg-white py-2 pl-8 pr-12 h-28 rounded-full border flex items-center justify-center shrink-0'
        style={style}
        onClick={() => setCategory(category.id)}>
        <IconComponent />
        <div className='text-xs font-medium'>{category.title}</div>
      </button>
    </>
  );
};

export default MapChip;
