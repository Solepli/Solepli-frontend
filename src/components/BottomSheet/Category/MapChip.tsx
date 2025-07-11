import React from 'react';
import { Category } from '../../../types';
import { usePlaceStore } from '../../../store/placeStore';
import { iconMap, iconBlackMap } from '../../../utils/icon';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { useMarkerStore } from '../../../store/markerStore';

interface CategoryButtonProps {
  category: Category;
}

const MapChip: React.FC<CategoryButtonProps> = ({ category }) => {
  const navigate = useNavigate();

  const { selectedCategory, setCategory } = usePlaceStore(
    useShallow((state) => ({
      selectedCategory: state.selectedCategory,
      setCategory: state.setCategory,
    }))
  );
  const { searchByCategory } = useMarkerStore(
    useShallow((state) => ({
      searchByCategory: state.searchByCategory,
    }))
  );

  // const isSelected = selectedCategory === category.id;

  const style = {
    backgroundColor:
      selectedCategory === category.id
        ? `var(--color-chip-bg-${category.id})`
        : 'var(--color-white)',
    // color: selectedCategory ? 'var(--color-black)' : 'var(--color-primary-900)',
    border:
      selectedCategory === category.id
        ? `1px solid var(--color-chip-${category.id})`
        : '1px solid var(--color-grayScale-100)',
  };

  const IconComponent =
    selectedCategory === category.id
      ? iconBlackMap[category.id]
      : iconMap[category.id];

  const handleClick = () => {
    // setCategory(category.id);

    if (selectedCategory === category.id) {
      setCategory(null); // 카테고리 지정
      searchByCategory(null); // 마커 업데이트
    } else {
      setCategory(category.id);
      searchByCategory(category.id);
    }

    navigate('/map/list?queryType=category');
  };

  return (
    <>
      <button
        className='w-fit bg-white py-2 pl-8 pr-12 h-28 rounded-full border flex items-center justify-center shrink-0 gap-4'
        style={style}
        onClick={handleClick}>
        <IconComponent />
        <div className='text-xs font-medium'>{category.title}</div>
      </button>
    </>
  );
};

export default MapChip;
