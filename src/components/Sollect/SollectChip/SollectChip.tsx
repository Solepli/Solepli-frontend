import React from 'react';
import { SollectChipProps } from '../../../interface';
import { iconMap, iconBlackMap } from '../../../utils/icon';
import { useSollectStore } from '../../../store/sollectStore';
import { useNavigate } from 'react-router-dom';

const SollectChip: React.FC<SollectChipProps> = ({ category }) => {
  const { selectedCategory, setSelectedCategory, clearCategory } = useSollectStore();
  const isSelected = selectedCategory === category.id;
  const navigate = useNavigate();

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
      navigate("/sollect/search/result");
    }
  }

  return (
    <div
      className='w-48 h-48 border-1 flex justify-center items-center rounded-lg shrink-0 button'
      style={style}
      onClick={handleClick}>
      <IconComponent />
    </div>
  );
};

export default SollectChip;
