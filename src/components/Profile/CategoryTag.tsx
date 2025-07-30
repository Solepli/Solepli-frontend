import React from 'react';
import { Category } from '../../types';

interface CategoryTagProps {
  category: Category;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryTag: React.FC<CategoryTagProps> = ({
  category,
  selected,
  onClick,
}) => {
  const baseStyle = 'py-10 px-8 rounded text-center text-sm border-1 ';
  const selectedStyle = selected
    ? 'border-primary-950'
    : 'text-primary-950 border-primary-100';
  const backgroundColor = selected
    ? { backgroundColor: `var(--color-chip-bg-${category.id})` }
    : {};

  return (
    <div
      className={`${baseStyle} ${selectedStyle} button`}
      style={backgroundColor}
      onClick={onClick}>
      {category.title}
    </div>
  );
};

export default CategoryTag;
