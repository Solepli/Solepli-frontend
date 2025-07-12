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
import { useNavigate } from 'react-router-dom';
import { usePlaceStore } from '../../../store/placeStore';
import { useMarkerStore } from '../../../store/markerStore';
import { useShallow } from 'zustand/shallow';

interface CategoryButtonProps {
  category: Category;
}

const iconMap: Record<string, string> = {
  food: foodFill,
  cafe: cafeFill,
  drink: drinkFill,
  entertainment: entertainmentFill,
  culture: cultureFill,
  shop: shopFill,
  walk: walkFill,
  work: workFill,
};

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  const navigate = useNavigate();
  const icon = iconMap[category.id];

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

  const handleClick = () => {
    if (selectedCategory !== category.id) {
      setCategory(category.id);
    }
    searchByCategory(category.id);
    navigate('/map/list?queryType=category');
  };

  return (
    <div
      className='relative w-84 h-84 flex justify-center items-center rounded-[10px]'
      style={{
        backgroundColor: `var(--color-chip-light-bg-${category.id})`,
      }}
      onClick={handleClick}>
      <div
        className='absolute top-6 right-6 w-6 h-6 rounded-full'
        style={{ backgroundColor: `var(--color-chip-${category.id})` }}></div>
      <div className='flex flex-col justify-center items-center'>
        <img className='w-32 h-32' src={icon} alt={category.id} />
        <div
          className='text-center text-sm font-medium leading-tight'
          style={{ color: `var(--color-chip-${category.id})` }}>
          {category.title}
        </div>
      </div>
    </div>
  );
};

export default CategoryButton;
