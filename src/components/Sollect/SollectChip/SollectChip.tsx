import React from 'react';
import { SollectChipProps } from '../../../interface';
import { iconMap, iconBlackMap } from '../../../utils/icon';
import { useSollectStore } from '../../../store/sollectStore';

const SollectChip: React.FC<SollectChipProps> = ({ category }) => {
  const { selectedCategory, setSelectedCategory, clearCategory } = useSollectStore();
  const isSelected = selectedCategory === category.id;

  const IconComponent = isSelected
    ? iconBlackMap[category.id]
    : iconMap[category.id];

  const style = {
    backgroundColor: isSelected
      ? `var(--color-chip-bg-${category.id})`
      : 'var(--color-white)',
    color: isSelected ? 'var(--color-black)' : 'var(--color-primary-900)',
    border: isSelected
      ? `1px solid var(--color-chip-${category.id})`
      : '1px solid var(--color-primary-100)',
  };

  const handleClick = ()=>{
    if(isSelected){
      clearCategory();
    }else{
      setSelectedCategory(category.id);
    }
  }

  return (
    <div
      className='w-40 h-40 border-1 flex justify-center items-center rounded-lg shrink-0'
      style={style}
      onClick={handleClick}>
      <IconComponent />
    </div>
  );
};

export default SollectChip;
