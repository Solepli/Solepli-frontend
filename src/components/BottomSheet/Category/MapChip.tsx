import React from 'react';
import { Category } from '../../../types';
import Food from '../../../assets/category-icons/food.svg?react';
import Cafe from '../../../assets/category-icons/cafe.svg?react';
import Drink from '../../../assets/category-icons/drink.svg?react';
import Entertainment from '../../../assets/category-icons/entertainment.svg?react';
import Culture from '../../../assets/category-icons/culture.svg?react';
import Shop from '../../../assets/category-icons/shop.svg?react';
import Walk from '../../../assets/category-icons/walk.svg?react';
import Work from '../../../assets/category-icons/work.svg?react';
import { usePlaceStore } from '../../../store/placeStore';
import FoodFill from '../../../assets/category-icons/foodFill.svg?react';
import CafeFill from '../../../assets/category-icons/cafeFill.svg?react';
import DrinkFill from '../../../assets/category-icons/drinkFill.svg?react';
import EntertainmentFill from '../../../assets/category-icons/entertainmentFill.svg?react';
import CultureFill from '../../../assets/category-icons/cultureFill.svg?react';
import ShopFill from '../../../assets/category-icons/shopFill.svg?react';
import WalkFill from '../../../assets/category-icons/walkFill.svg?react';
import WorkFill from '../../../assets/category-icons/workFill.svg?react';

interface CategoryButtonProps {
  category: Category;
}

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  food: Food,
  cafe: Cafe,
  drink: Drink,
  entertainment: Entertainment,
  culture: Culture,
  shop: Shop,
  walk: Walk,
  work: Work,
};

const iconFillMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  food: FoodFill,
  cafe: CafeFill,
  drink: DrinkFill,
  entertainment: EntertainmentFill,
  culture: CultureFill,
  shop: ShopFill,
  walk: WalkFill,
  work: WorkFill,
};

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
    ? iconFillMap[category.id]
    : iconMap[category.id];

  return (
    <>
      <div
        className='w-fit bg-white py-2 pl-8 pr-12 h-28 rounded-full border flex items-center justify-center shrink-0'
        style={style}
        onClick={() => setCategory(category.id)}>
        <IconComponent />
        <div className='text-xs font-medium'>{category.title}</div>
      </div>
    </>
  );
};

export default MapChip;
