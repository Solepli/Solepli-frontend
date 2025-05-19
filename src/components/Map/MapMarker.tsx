import React from 'react';
import FoodFill from '../../assets/category-icons/black/FoodFillBlack.svg?react';
import CafeFill from '../../assets/category-icons/black/CafeFillBlack.svg?react';
import DrinkFill from '../../assets/category-icons/black/DrinkFillBlack.svg?react';
import EntertainmentFill from '../../assets/category-icons/Black/entertainmentFillBlack.svg?react';
import CultureFill from '../../assets/category-icons/black/CultureFillBlack.svg?react';
import ShopFill from '../../assets/category-icons/black/ShopFillBlack.svg?react';
import WalkFill from '../../assets/category-icons/black/WalkFillBlack.svg?react';
import WorkFill from '../../assets/category-icons/black/WorkFillBlack.svg?react';

const categoryKeyMap: Record<string, string> = {
  식당: 'food',
  카페: 'cafe',
  주점: 'drink',
  '오락/여가': 'entertainment',
  '문화/예술': 'culture',
  쇼핑: 'shop',
  산책: 'walk',
  '공부/작업': 'work',
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

interface MarkerIconProps {
  category: string;
}

const MarkerIcon: React.FC<MarkerIconProps> = ({ category }) => {
  const englishKey = categoryKeyMap[category];
  const Icon = iconFillMap[englishKey];

  const style = {
    backgroundColor: `var(--color-chip-bg-${englishKey})`,
    border: `1px solid var(--color-chip-${englishKey})`,
  };

  return (
    <div className='flex w-24 h-24 p-2 justify-center items-center shrink-0 aspect-[1/1]'>
      <div
        className='flex w-20 h-20 p-2 justify-center items-center shrink-0 aspect-[1/1] 
        rounded-[10px] border border-solid'
        style={style}>
        <Icon className='w-16 h-16 shrink-0 aspect-[1/1]' />
      </div>
    </div>
  );
};

export default MarkerIcon;
